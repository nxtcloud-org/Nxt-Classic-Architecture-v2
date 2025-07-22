import json
import boto3
import pymysql
import os

from botocore.exceptions import ClientError


def lambda_handler(event, context):
    print("EC2 -> Lambda로 전달된 데이터", event["body"])

    # Bedrock 클라이언트 초기화
    bedrock = boto3.client(service_name="bedrock-runtime", region_name="us-east-1")

    try:
        input_data = json.loads(event["body"])
    except json.JSONDecodeError as e:
        print("JSON 파싱 오류:", e)
        return {"statusCode": 400, "body": "Invalid JSON format"}

    if not input_data or "content" not in input_data or "noteId" not in input_data:
        print("Invalid request: No content or noteId provided")
        return {"statusCode": 400, "body": "No content or noteId provided"}

    user_message = input_data["content"]
    note_id = input_data["noteId"]
    print(
        "ai한테 보낼 유저 메시지 내용",
        user_message,
        type(user_message),
    )

    try:
        # 1. 모델 ID 설정
        model_id = "amazon.nova-lite-v1:0"

        # 2. converse API에 맞는 메시지 형식 구성
        # 시스템 프롬프트(역할 부여)와 사용자 메시지를 분리합니다.
        system_prompt = "You are an expert in AWS. Based on the following data, suggest one AWS service that the user can additionally learn. Ensure the response is at least three sentences long and in Korean."

        messages = [{"role": "user", "content": [{"text": user_message}]}]

        # 3. converse API 호출
        response = bedrock.converse(
            modelId=model_id,
            messages=messages,
            system=[{"text": system_prompt}],  # 시스템 프롬프트 전달
            inferenceConfig={"maxTokens": 1000, "temperature": 0.7},
        )

        # 4. converse API의 응답 형식에 맞게 결과 파싱
        ai_response = response["output"]["message"]["content"][0]["text"]

        print("ai 한테 받아왔어?", ai_response)

        # 데이터베이스 연결 설정
        db = pymysql.connect(
            host=os.environ["DB_HOST"],
            user=os.environ["DB_USER"],
            password=os.environ["DB_PASSWORD"],
            database=os.environ["DB_NAME"],
            cursorclass=pymysql.cursors.DictCursor,
        )

        try:
            with db.cursor() as cursor:
                # AI 응답 저장
                sql = "UPDATE notes SET ai_note = %s, ai_type = %s WHERE id = %s"
                cursor.execute(sql, (ai_response, "nova", note_id))
                db.commit()
        finally:
            db.close()

        return ai_response

    except (ClientError, Exception) as e:
        print(f"Error: {e}")
        raise Exception("Lambda function error")
