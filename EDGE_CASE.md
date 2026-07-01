# Edge Case Demonstration

This document demonstrates how the Canonical Candidate Profile Engine handles common edge cases.

---

# Test Environment

- Node.js
- Google Gemini API
- Recruiter CSV
- Resume PDF

---

# Edge Case 1 — Missing Resume

### Input

`resume.pdf` not present.

### Expected

- Resume parsing fails gracefully.
- Meaningful error/warning displayed.
- Pipeline terminates safely.

### Result

✅ PASS

---

# Edge Case 2 — Empty Resume

### Input

Resume contains no extractable text.

### Expected

- Empty resume detected.
- Resume extraction aborted.
- Validation triggered.

### Result

✅ PASS

---

# Edge Case 3 — Invalid Email

### Input

```text
hardik.gmail.com
```

### Expected

- Invalid email removed.
- Warning generated.

### Result

✅ PASS

---

# Edge Case 4 — Invalid Phone

### Input

```text
abc12345
```

### Expected

- Invalid phone removed.
- Warning generated.

### Result

✅ PASS

---

# Edge Case 5 — Duplicate Skills

### Input

```text
React
React
Node.js
Node.js
MongoDB
```

### Expected

```text
React
Node.js
MongoDB
```

### Result

✅ PASS

---

# Edge Case 6 — Duplicate Emails

### Input

```text
hardik@gmail.com
hardik@gmail.com
```

### Expected

Only one email retained.

### Result

✅ PASS

---

# Edge Case 7 — Duplicate Phones

### Input

```text
+919876543210
+919876543210
```

### Expected

Only one phone retained.

### Result

✅ PASS

---

# Edge Case 8 — Missing Required Fields

### Input

Candidate without full name.

### Expected

Validation fails.

### Result

✅ PASS

---

# Edge Case 9 — Conflicting Company Information

### Input

Recruiter CSV

```text
Google
```

Resume

```text
Microsoft
```

### Expected

Resume value selected according to merge policy.

Provenance updated.

### Result

✅ PASS

---

# Edge Case 10 — Duplicate Certifications

### Input

```text
AWS
AWS
MongoDB
MongoDB
```

### Expected

Duplicates removed.

### Result

✅ PASS

---

# Summary

| Edge Case | Status |
|-----------|--------|
| Missing Resume | ✅ |
| Empty Resume | ✅ |
| Invalid Email | ✅ |
| Invalid Phone | ✅ |
| Duplicate Skills | ✅ |
| Duplicate Emails | ✅ |
| Duplicate Phones | ✅ |
| Missing Required Fields | ✅ |
| Conflicting Values | ✅ |
| Duplicate Certifications | ✅ |

---

All demonstrated edge cases were handled successfully by the Canonical Candidate Profile Engine.