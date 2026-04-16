<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=40&pause=1000&color=E8323A&center=true&vCenter=true&width=600&lines=StrokeGuard+AI;Predictive+Healthcare;Explainable+Machine+Learning" alt="Typing SVG" />
  
  <p align="center">
    <strong>A high-fidelity, interactive React dashboard for real-time stroke risk prediction using Explainable AI (XAI).</strong>
  </p>

  <p align="center">
    <a href="https://yashwanthnavari.github.io/-Heart-Disease-Risk-Prediction-System/"><img src="https://img.shields.io/badge/🔴_Live_Demo-StrokeGuard_AI-E8323A?style=for-the-badge&logo=github" alt="Live Demo" /></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Machine%20Learning-F9AB00?style=flat&logo=google-cloud&logoColor=white" alt="Machine Learning" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript" />
  </p>
</div>

---

## 🌐 Live Deployment

<div align="center">

<!-- Animated pulse beacon -->
<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=22&pause=1000&color=00FF88&center=true&vCenter=true&width=600&lines=✅+Deployed+%26+Live+on+GitHub+Pages;🚀+Zero-Latency+Static+Hosting;🔗+Click+Below+to+Launch+the+App" alt="Deployment Status" />

<br/>

<!-- Glowing live demo button -->
<a href="https://yashwanthnavari.github.io/-Heart-Disease-Risk-Prediction-System/" target="_blank">
  <img src="https://img.shields.io/badge/🟢_LIVE-StrokeGuard_AI_Dashboard-00FF88?style=for-the-badge&labelColor=0D1117&color=00FF88" alt="Live Demo" height="45"/>
</a>

<br/><br/>

<!-- Status badges row -->
<img src="https://img.shields.io/badge/Status-Online_%F0%9F%9F%A2-brightgreen?style=flat-square&labelColor=0D1117" alt="Status: Online"/>
&nbsp;
<img src="https://img.shields.io/badge/Host-GitHub_Pages-181717?style=flat-square&logo=github&logoColor=white&labelColor=0D1117" alt="GitHub Pages"/>
&nbsp;
<img src="https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white&labelColor=0D1117" alt="GitHub Actions"/>
&nbsp;
<img src="https://img.shields.io/badge/Deploy-Auto_on_Push-E8323A?style=flat-square&logo=rocket&logoColor=white&labelColor=0D1117" alt="Auto Deploy"/>

<br/><br/>

<!-- Deployment info box -->
| 🚀 Detail | 📋 Info |
|:---|:---|
| **Live URL** | [https://yashwanthnavari.github.io/-Heart-Disease-Risk-Prediction-System/](https://yashwanthnavari.github.io/-Heart-Disease-Risk-Prediction-System/) |
| **Hosting Platform** | GitHub Pages |
| **Build Tool** | Vite (React) |
| **Deploy Trigger** | Auto-deploy on every push to `main` |
| **CI/CD Pipeline** | GitHub Actions — `.github/workflows/deploy.yml` |

</div>

---

## 🚀 Overview

**StrokeGuard AI** is not just an ML model, it's a bridge between clinical intuition and algorithmic prediction. Built to combat the severe class imbalance of real-world stroke datasets, this system implements pre-trained Logistic Regression, Random Forest, and AdaBoost models. 

Through an interactive frontend architecture, clinicians and users can visually dissect feature importances via SHAP-like waterfalls and dynamic risk contribution models.

---

## ✨ System Architecture & Features

### 🔬 1. Dataset & SMOTE Imbalance Visualizer
Real-world medical datasets are massively skewed (our dataset has a 95.1% to 4.9% ratio of healthy to stroke patients). The **Overview** tab dynamically bridges the gap by visualizing the pre-processing pipeline, specifically highlighting how **SMOTE** (Synthetic Minority Over-sampling Technique) prevents the classifier from collapsing into an all-negative predictor.

### ⚔️ 2. Model Arena
A live competitive view of our classifier algorithms:
- **Logistic Regression**, **AdaBoost**, and **Random Forest**.
- Dynamically rendered Custom SVG **ROC curves**.
- Direct visual comparisons showing Test Area Under the Curve (AUC) vs. Cross-Validation AUC to detect data-leakage and overfitting.

### 🧠 3. Explainable AI (XAI) & SHAP
The "black box" is opened using custom-built SVG SHAP beeswarm simulators and waterfall representations. Users can see mathematically **why** a patient was flagged:
- Top features Gini Importances.
- Percentage breakdown between actionable (Clinical, Lifestyle) and non-actionable (Demographic) variables.

### 🩺 4. Live Risk Predictor Engine
Input patient biometrics in real-time and watch the live risk score update dynamically on a custom-designed **Retro Dot-Matrix Display**. The dashboard transforms the raw output probabilities back into actionable clinical language based on variable contributions. 

---

## 🛠️ Technical Implementation

The system is a fully client-side static web application designed for absolute zero-latency execution. 

* **Data Handling**: All complex standardizations (Z-scores), categorical one-hot-encodings, and mathematical regressions (Sigmoid, Extrapolation) are executed smoothly inside pure JavaScript functional pipelines (`src/data.js`).
* **Visuals**: Zero raster images. Everything is drawn mathematically using CSS Grid matrices, dynamic Recharts parameters, and inline SVG manipulation.

---

## 💻 Getting Started Locally

Want to run the dashboard on your own machine? It takes less than 30 seconds:

```bash
# 1. Clone the repository
git clone https://github.com/YashwanthNavari/-Heart-Disease-Risk-Prediction-System.git

# 2. Enter the directory
cd -Heart-Disease-Risk-Prediction-System

# 3. Install NPM dependencies
npm install

# 4. Start the Vite development server
npm run dev
```

Visit `http://localhost:5173` to explore the dashboard locally.

---
<div align="center">
  <sub>Built with ❤️ by Yashwanth Reddy | <a href="https://github.com/YashwanthNavari">GitHub Profile</a></sub>
</div>
