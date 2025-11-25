# ☁️ Serverless Notes Application

A production-ready serverless web application built with AWS cloud services. Create, view, and delete notes with secure user authentication—no server management required.

> **📖 [Read the Complete Step-by-Step Guide on Dev.to →](https://dev.to/siddhesmm303/building-a-serverless-notes-app-with-aws-amplify-cognito-lambda-dynamodb-api-gateway-23o1)**  
> Detailed tutorial with screenshots, code explanations, and troubleshooting tips.


## 🚀 Features

- 🔐 Secure user authentication with Amazon Cognito
- 📝 Create, read, and delete notes
- ☁️ 100% serverless architecture
- 🚀 Auto-scaling and high availability
- 💰 Cost-effective (AWS Free Tier eligible)

## 🛠️ Tech Stack

**Frontend:** React, AWS Amplify  
**Backend:** AWS Lambda (Python), API Gateway  
**Database:** Amazon DynamoDB  
**Authentication:** Amazon Cognito

## 🏗️ Architecture

```
User → AWS Amplify → Amazon Cognito → API Gateway → AWS Lambda → DynamoDB
```

- **AWS Amplify** - Frontend hosting with CI/CD
- **Amazon Cognito** - User authentication
- **API Gateway** - REST API endpoints
- **AWS Lambda** - Serverless compute
- **DynamoDB** - NoSQL database

## 📦 Quick Start

### Prerequisites
- AWS Account
- Node.js (v16+)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/serverless-notes-app.git
cd serverless-notes-app

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Add your AWS configuration to .env

# Run locally
npm run dev
```

### Environment Variables

```env
VITE_API_URL=your_api_gateway_url
VITE_COGNITO_USER_POOL_ID=your_user_pool_id
VITE_COGNITO_CLIENT_ID=your_client_id
VITE_COGNITO_DOMAIN=your_cognito_domain
```

## 📚 Documentation

The [complete guide on Dev.to](YOUR_DEVTO_ARTICLE_URL) includes AWS service setup, security configuration, and deployment steps.

## 🔌 API Endpoints

```
GET    /notes           - Get all notes
POST   /notes           - Create new note
DELETE /notes/{notesId} - Delete specific note
```

## 🐛 Common Issues

**DynamoDB Type Mismatch:** Pass `notesId` as string, not number  
**CORS Error:** Enable CORS in API Gateway for all methods  
**Build Failed:** Ensure `package.json` is in repository root

See the [full troubleshooting guide](YOUR_DEVTO_ARTICLE_URL) for solutions.

## 💰 Cost

This application runs on AWS Free Tier:
- AWS Amplify: 1000 build minutes/month
- Cognito: 50,000 MAUs free
- Lambda: 1M requests/month free
- API Gateway: 1M requests/month free
- DynamoDB: 25 GB storage free

**Estimated cost: $0/month** for typical usage

## 📁 Project Structure

```
serverless-notes-app/
├── src/                 # React frontend code
├── lambda/              # Python Lambda functions
├── screenshots/         # App screenshots
└── README.md
```

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📧 Contact

**Your Name**  
LinkedIn: [Your Profile](YOUR_LINKEDIN_URL)  
Email: your.email@example.com

---

⭐ If this project helped you, please give it a star!

**🔗 Live Demo:** [View Application](YOUR_AMPLIFY_URL)  
**📖 Full Tutorial:** [Read on Dev.to](YOUR_DEVTO_ARTICLE_URL)