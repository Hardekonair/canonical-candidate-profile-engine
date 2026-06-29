# Internal Candidate Schema

All parsers (CSV, Resume PDF, etc.) will convert their input into this common object.

```json
{
  "candidateId": "",
  "fullName": "",
  "emails": [],
  "phones": [],
  "currentCompany": "",
  "currentTitle": "",
  "skills": [],
  "education": [],
  "experience": [],
  "location": "",
  "summary": ""
}
```