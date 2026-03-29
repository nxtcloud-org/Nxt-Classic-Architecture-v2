import streamlit as st

st.title("AI 정책 연구 프로필")

st.subheader("AI 정책 대학원 연구원을 위한 소개 페이지")

col1, col2 = st.columns(2)

with col1:
    st.write("**연구자 정보를 입력해 주세요.**")
    name = st.text_input("이름", "김연구")
    affiliation = st.text_input("소속", "서울대학교 AI 정책 대학원")
    research_area = st.selectbox(
        "주요 연구 분야",
        [
            "AI 규제 및 거버넌스",
            "알고리즘 공정성/편향",
            "AI 윤리 프레임워크",
            "생성형 AI와 저작권",
            "자율주행/무기 규제",
            "AI와 노동시장 변화",
            "데이터 프라이버시/주권",
            "AI 안전(Safety/Alignment)",
        ],
    )
    methodology = st.multiselect(
        "연구 방법론 (복수 선택)",
        [
            "비교법 분석",
            "정량적 정책 평가",
            "사례 연구",
            "이해관계자 인터뷰",
            "시뮬레이션/모델링",
            "텍스트 마이닝/NLP",
        ],
        default=["비교법 분석"],
    )
    current_focus = st.text_area(
        "현재 연구 관심사",
        "EU AI Act 시행 이후 국내 AI 규제 프레임워크의 "
        "실효성 비교 연구를 진행하고 있습니다.",
    )

with col2:
    st.write("### 연구자 프로필 카드")
    if st.button("프로필 생성"):
        if name and affiliation and current_focus:
            st.success("프로필이 생성되었습니다!")
            st.write(f"- **이름**: {name}")
            st.write(f"- **소속**: {affiliation}")
            st.write(f"- **연구 분야**: {research_area}")
            st.write(f"- **방법론**: {', '.join(methodology)}")
            st.write(f"- **현재 관심사**: {current_focus}")
            st.balloons()
        else:
            st.error("모든 필드를 입력해 주세요!")

st.write("---")

st.write("### AI 정책 타임라인")
timeline_data = {
    "2024.08": "EU AI Act 발효",
    "2025.02": "EU AI Act 전면 시행",
    "2025.01": "한국 AI 기본법 국회 통과",
    "2026.01": "한국 AI 기본법 시행",
}
for date, event in timeline_data.items():
    st.write(f"**{date}** — {event}")

st.write("---")

if st.button("오늘의 연구 질문", type="primary"):
    import random

    questions = [
        "AI 규제는 혁신을 저해하는가, 촉진하는가?",
        "알고리즘 영향평가의 실효성을 어떻게 측정할 수 있는가?",
        "생성형 AI의 학습 데이터에 대한 공정 이용 기준은?",
        "AI 시스템의 투명성 요구는 기업 비밀과 어떻게 균형을 이루는가?",
        "국가 간 AI 규제 차이가 만드는 규제 차익거래 문제는?",
        "AI 안전 연구와 정책 사이의 간극을 어떻게 좁힐 수 있는가?",
    ]
    st.info(f"**오늘의 질문**: {random.choice(questions)}")

st.write("---")
st.info(
    """
    이 페이지는 Streamlit 멀티페이지 기능으로 제작되었습니다.
    사이드바에서 페이지를 전환할 수 있습니다.
    Python 코드 몇 줄로 연구 도구와 대시보드를 빠르게 프로토타이핑해 보세요.
    """
)
