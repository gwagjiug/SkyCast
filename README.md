# SkyCast
SkyCast는 사용자의 현재 위치를 기반으로 실시간 날씨 정보를 제공하는 React 애플리케이션입니다. 날씨 상태에 따라 배경 이미지와 아이콘이 동적으로 변경되며, OpenWeatherMap API와 Unsplash API를 통해 기상 정보를 시각적으로 표현합니다.

# 🌐 프로젝트 소개

## 선택 기술 스택

* **React**: 사용자 인터페이스를 구성하고 상태 관리를 위해 사용.

* **API**:

 * **OpenWeatherMap API**: 사용자의 현재 위치를 기준으로 실시간 날씨 정보를 가져옴.
 * **Unsplash API**: 날씨 상태에 따라 동적인 배경 이미지를 제공.

* **CSS**: = tailwind 
  
## 기능 요약

* 사용자의 **위치 기반 날씨 정보** 제공

* 날씨 상태에 따라 **동적인 배경 이미지**와 **아이콘** 변경

* **실시간 온도**, **날씨 상태**(맑음, 비, 눈 등) 표시

* **위치 정보** 제공 불가 시 오류 메시지 출력

## 사용 이유

* React: 빠르고 효율적인 UI 개발을 위해 선택, 컴포넌트 재사용성과 상태 관리에 용이함.

* OpenWeatherMap API: 날씨 정보 제공을 위한 신뢰성 있는 데이터 소스.

* Unsplash API: 날씨 상황에 맞는 고품질 배경 이미지를 제공하여 사용자 경험 향상.


# 📈 기능 설명
## 1. 실시간 날씨 정보 제공
* 사용자가 웹사이트에 접속하면, 브라우저의 위치 정보를 사용하여 현재 위치의 날씨를 불러옵니다.
* **OpenWeatherMap API**를 사용하여 온도, 날씨 상태(맑음, 흐림, 비 등)를 실시간으로 제공합니다.

## 2. 동적 배경 이미지
* **Unsplash API**를 통해 현재 날씨에 맞는 배경 이미지를 동적으로 로드합니다. 예를 들어, 맑은 날씨일 경우 맑은 하늘 이미지가 배경에 나타나며, 비가 오는 날씨에는 비와 관련된 이미지가 표시됩니다.

## 3. 날씨 아이콘 및 UI

* 날씨 상태에 따라 `Lucide-react` 아이콘 라이브러리를 사용하여 동적인 아이콘을 표시합니다. 예를 들어, 맑은 날씨에는 태양 아이콘, 비가 오는 날씨에는 비구름 아이콘을 표시합니다.

# 🛠️ 기술적 구현
## React Hooks 및 API 통합
* `useState`와 `useEffect`를 사용하여 상태 관리 및 API 호출을 처리합니다.

* 브라우저의 `navigator.geolocation API`를 사용하여 사용자의 위치를 얻고, 이를 OpenWeatherMap API의 쿼리로 전달하여 날씨 데이터를 가져옵니다.

* 배경 이미지는 날씨 데이터에 따라 `Unsplash API`에서 동적으로 가져옵니다.

## 상태 및 오류 처리

* 위치 정보 제공에 대한 사용자 승인 여부에 따라 날씨 데이터를 가져올지 여부를 결정하고, 위치를 제공하지 않으면 오류 메시지를 출력합니다.
* API 호출에 실패하거나 데이터가 없을 경우에도 오류 처리를 통해 기본 메시지나 대체 이미지를 제공합니다.

# ✨ 화면 구성
---
* **현재 날씨 정보에 따라 배경 이미지가 변경 됩니다**

![Clear](https://github.com/user-attachments/assets/b8f4091b-ae9d-454d-8ea2-46222d1ba123)

---
![Clouds](https://github.com/user-attachments/assets/ccb8003b-484c-4045-994c-bac6cda10f6b)

---

![Snow](https://github.com/user-attachments/assets/b6274698-6f3e-4c41-9a5e-76f5ffe3dfce)

---
![Thunderstorm](https://github.com/user-attachments/assets/7c429635-9628-4b6f-9d41-5a3da7b84d0b)

---
![Rain](https://github.com/user-attachments/assets/fde7cfd8-5967-42bf-b655-b229b774ec15)

