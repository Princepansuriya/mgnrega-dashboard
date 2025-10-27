# 🌾 MGNREGA District Performance Dashboard

This project is an interactive web-based dashboard designed to make **MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act)** performance data accessible and understandable to the general public — especially for citizens of rural districts who may not have high data literacy or technical expertise.

The dashboard visualizes **district-level monthly performance metrics** made available via the **Government of India’s Open API** for MGNREGA.

---

## 📊 Project Overview

The application fetches MGNREGA performance data from open government APIs and presents it in an **intuitive, visual, and user-friendly interface**.  
Users can:

- 🔍 Select a district to view its performance.
- 📈 Explore metrics like employment generation, expenditure, and work completion.
- 📊 Compare performance between years or districts.
- 💬 Interact with an embedded chatbot for guidance and data explanations.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend Framework** | React + TypeScript (Vite) |
| **Charts & Visualization** | Recharts |
| **Styling** | Tailwind CSS |
| **Data Management** | Custom React Hooks |
| **API Source** | [data.gov.in - MGNREGA Open API](https://www.data.gov.in/catalog/mahatma-gandhi-national-rural-employment-guarantee-act-mgnrega) |

---

<img width="1901" height="928" alt="Screenshot 2025-10-27 224420" src="https://github.com/user-attachments/assets/61775eb0-ee4b-4c17-b817-a610db16988c" />
<img width="1718" height="918" alt="Screenshot 2025-10-27 224434" src="https://github.com/user-attachments/assets/c960c5f8-6925-4d98-b1f4-48da3f22a940" />
<img width="1898" height="924" alt="Screenshot 2025-10-27 224510" src="https://github.com/user-attachments/assets/211410eb-c216-493f-a58d-8efa8d132c9d" />


## 📁 Project Structure

mgnrega_project/
├── App.tsx
├── index.html
├── index.tsx
├── vite.config.ts
├── package.json
├── tsconfig.json
├── types.ts
├── metadata.json
├── .env.local
├── .gitignore
├── data/
│ ├── mgnrega_data.json
│ ├── mgnrega_up_data.json
├── hooks/
│ ├── useMgnregaData.ts
├── components/
│ ├── Header.tsx
│ ├── Footer.tsx
│ ├── DistrictSelector.tsx
│ ├── PerformanceDashboard.tsx
│ ├── MetricCard.tsx
│ ├── ComparisonChart.tsx
│ ├── TrendChart.tsx
│ ├── ExpenditureChart.tsx
│ ├── YearComparisonChart.tsx
│ ├── Chatbot.tsx
│ ├── ChatbotToggleButton.tsx
│ ├── HelpModal.tsx
│ ├── LocationErrorModal.tsx
│ ├── Loader.tsx
│ ├── Welcome.tsx
│ ├── DashboardSkeleton.tsx
│ ├── ComparisonMetricCard.tsx


---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or above)
- npm or yarn

### Steps

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/mgnrega-dashboard.git

# 2️⃣ Move into the project directory
cd mgnrega-dashboard

# 3️⃣ Install dependencies
npm install

# 4️⃣ Create a local environment file
cp .env.local.example .env.local

# 5️⃣ Start the development server
npm run dev
🧠 Key Features



✅ District Selection – choose your local district to view data.

✅ Performance Dashboard – visualize metrics like total works, expenditure, and employment.

✅ Trend & Comparison Charts – compare performance across years.

✅ AI Chatbot – interactive guide to help users understand MGNREGA terms and data insights.

✅ Error & Help Modals – assist users when API or location data fails.


📘 Data Source

The data displayed is powered by the Government of India’s Open Data Platform:

🔗 https://data.gov.in/catalog/mahatma-gandhi-national-rural-employment-guarantee-act-mgnrega


📜 License

This project is released under the MIT License.
You are free to use, modify, and distribute it for educational and public awareness purposes.
