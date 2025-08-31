# Analytics Middleware

A Lambda function providing analytics capabilities for the Nisaba survey system, built with Python and deployed via AWS Amplify.

## Features

- **Question-Centric Data Structure**: Returns survey data organized by questions with comprehensive analytics
- **Rich Analytics**: Pre-calculated statistics and chart data for quantitative questions
- **Raw Data Access**: Direct access to qualitative content (text, audio, pictures) for detailed review
- **Advanced Filtering**: Server-side filtering by date, entities, executors, and location
- **Excel Export**: Generate Excel files with survey results
- **Multi-language Support**: Handles surveys with multiple language options

## API Endpoints

### 1. Get Total Number of Surveys
```
GET /analytics/getTotalNumberOfSurveys
```
Returns the total count of surveys in the system.

**Response:**
```json
{
  "res": 42
}
```

### 2. Get Aggregated Survey Data by ID
```
GET /analytics/getAggregatedSurveyDataById?SurveyID={survey_id}&[filters]
```
Returns comprehensive survey data organized by questions with analytics and raw data.

**Required Parameters:**
- `SurveyID`: The ID of the survey to retrieve

**Optional Filter Parameters:**
- `startDate`: Start date for filtering (ISO 8601 format)
- `endDate`: End date for filtering (ISO 8601 format)
- `entities`: Comma-separated list of entity IDs
- `executors`: Comma-separated list of executor IDs
- `north`: Northern latitude boundary
- `south`: Southern latitude boundary
- `east`: Eastern longitude boundary
- `west`: Western longitude boundary

**Example Request:**
```
GET /analytics/getAggregatedSurveyDataById?SurveyID=123&startDate=2024-01-01&entities=ent1,ent2&north=12.5&south=12.0&east=68.0&west=67.5
```

**Response Structure:**
```json
{
  "dataset": [
    {
      "question_id": "q123",
      "question_text": {
        "languageKeys": ["en", "de"],
        "languageTexts": ["What is your rating?", "Wie bewerten Sie?"]
      },
      "question_type": "RATING",
      "question_options": [...],
      "answers": [...],
      "analytics": {
        "total_answers": 25,
        "unique_entities": 5,
        "date_range": {
          "earliest": "2024-01-01T10:00:00Z",
          "latest": "2024-01-15T14:30:00Z"
        },
        "chart_data": {
          "histogram": {
            "bins": [1, 2, 3, 4, 5],
            "counts": [2, 3, 8, 10, 2]
          },
          "bar_chart": {
            "x": ["1★", "2★", "3★", "4★", "5★"],
            "y": [2, 3, 8, 10, 2]
          }
        },
        "statistics": {
          "average_rating": 3.6,
          "median_rating": 4.0,
          "rating_distribution": {
            "1": 2, "2": 3, "3": 8, "4": 10, "5": 2
          }
        }
      }
    }
  ],
  "entities": [...],
  "levels": [...]
}
```

### 3. Get Survey Results as Excel
```
GET /analytics/getSurveyResultsAsXLSX?SurveyID={survey_id}
```
Returns an Excel file (.xlsx) containing survey results.

**Required Parameters:**
- `SurveyID`: The ID of the survey to export

**Response:** Binary Excel file with appropriate headers

## Question Types and Analytics

### Quantitative Questions

#### Rating Questions
- **Chart Data**: Histogram, bar chart
- **Statistics**: Mean, median, min, max, rating distribution

#### Integer/Double Questions
- **Chart Data**: Histogram, basic statistics
- **Statistics**: Mean, median, min, max, range, standard deviation

#### Single Choice Questions
- **Chart Data**: Pie chart, bar chart
- **Statistics**: Total responses, option counts, most/least selected

#### Multiple Choice Questions
- **Chart Data**: Bar chart
- **Statistics**: Total responses, selection rates, popular combinations

### Qualitative Questions

#### Text Questions
- **Analytics**: Word frequency, text length statistics
- **Raw Data**: Complete text responses with metadata

#### Audio Questions
- **Analytics**: File statistics, duration distribution
- **Raw Data**: Audio file paths with metadata

#### Picture Questions
- **Analytics**: File statistics, type distribution
- **Raw Data**: Image file paths with metadata

## Filter Capabilities

### Date Range Filtering
Filter surveys by execution date:
```
?startDate=2024-01-01&endDate=2024-01-31
```

### Entity Filtering
Filter surveys by specific entities:
```
?entities=ent1,ent2,ent3
```

### Executor Filtering
Filter surveys by who executed them:
```
?executors=user1,user2
```

### Location Bounds Filtering
Filter surveys by geographic boundaries:
```
?north=12.5&south=12.0&east=68.0&west=67.5
```

## Data Structure Details

### Answer Object Structure
```json
{
  "answer_date": "2024-01-01T10:00:00Z",
  "executed_survey_id": "es456",
  "answer_value": "Some text or value",
  "entity_id": "ent789",
  "entity_name": "Entity Name",
  "executor": "John Doe",
  "location": {
    "latitude": 12.345,
    "longitude": 67.890
  },
  "metadata": {
    "applied_intervention_id": "ai123",
    "organization_id": "org456"
  }
}
```

### Raw Data Structure for Qualitative Questions
```json
{
  "raw_data": {
    "text_responses": [
      {
        "text": "The actual text content",
        "date": "2024-01-01T10:00:00Z",
        "entity": "Entity Name",
        "executor": "Executor Name",
        "executed_survey_id": "es456",
        "location": {
          "latitude": 12.345,
          "longitude": 67.890
        }
      }
    ]
  }
}
```

## Error Handling

The API returns standardized error responses:

```json
{
  "error": "Error message",
  "timestamp": "2024-01-01T10:00:00Z"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `400`: Bad Request (missing required parameters)
- `404`: Endpoint not found
- `405`: Method not allowed
- `500`: Internal server error

## Dependencies

- Python 3.8+
- boto3 (AWS SDK)
- requests (HTTP client)
- pandas (Data manipulation)
- XlsxWriter (Excel generation)

## Environment Variables

- `API_APINISABA_GRAPHQLAPIENDPOINTOUTPUT`: AppSync GraphQL endpoint
- `API_APINISABA_GRAPHQLAPIIDOUTPUT`: AppSync API ID
- `API_APINISABA_GRAPHQLAPIKEYOUTPUT`: AppSync API key
- `API_APINISABA_SURVEYTABLE_NAME`: DynamoDB survey table name

## Deployment

This function is deployed via AWS Amplify and configured as a Lambda function with API Gateway integration.

## Usage Examples

### Frontend Integration
```javascript
// Get survey data with filters
const response = await fetch('/analytics/getAggregatedSurveyDataById?SurveyID=123&startDate=2024-01-01');
const data = await response.json();

// Access question data
data.dataset.forEach(question => {
  if (question.question_type === 'RATING') {
    // Use pre-calculated analytics for charts
    const chartData = question.analytics.chart_data.bar_chart;
    Plotly.newPlot('chart', [chartData]);
  } else if (question.question_type === 'TEXT') {
    // Access raw text data
    const textResponses = question.raw_data.text_responses;
    displayTextList(textResponses);
  }
});
```

### Excel Export
```javascript
// Download Excel file
const response = await fetch('/analytics/getSurveyResultsAsXLSX?SurveyID=123');
const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'survey_results.xlsx';
a.click();
```
