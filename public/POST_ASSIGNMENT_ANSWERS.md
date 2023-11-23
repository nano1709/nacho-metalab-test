# GitHub Commit Activity Comparison App

## Overview

This React application allows users to compare the commit activity of public GitHub repositories. Users can search for repositories by name, select repositories to add to a list, and view the commit activity of the selected repositories on a graph.

## Table of Contents

- [Areas of Risk](#areas-of-risk)
- [Design Changes/Additions](#design-changesadditions)
- [Future Feature Considerations](#future-feature-considerations)
- [Clarifying Questions](#clarifying-questions)

## Areas of Risk

1. **API Rate Limits:**
   Fetching commit activity data from the GitHub API has the potential for rate limiting, especially if the user selects a large number of repositories. Implementing client-side caching or exploring alternative data retrieval strategies can mitigate this risk.

2. **Charting Library Compatibility:**
   The choice of a charting library (e.g., Recharts) is crucial for the success of the graph visualization. Ensuring compatibility and flexibility for future features might require a detailed assessment of available libraries.

3. **Data Accuracy:**
   Reliability on external APIs, such as the GitHub API, may introduce risks related to data accuracy and consistency. Implementing error handling and possibly a data validation mechanism can address this concern.

## Design Changes/Additions

1. **User Feedback:**
   Implementing a more robust feedback system for users during API calls and data loading processes, such as loading spinners or error messages, could enhance the user experience.

2. **User Authentication:**
   Considering the addition of user authentication features would allow users to save their selected repositories and preferences, providing a more personalized experience.

## Future Feature Considerations

1. **Historical Data Comparison:**
   Allowing users to compare commit activity over different time ranges or historical periods could provide valuable insights into the long-term development trends of selected repositories.

2. **Repository Language Filtering:**
   Implementing a feature to filter repositories based on programming languages could help users find repositories that align with their technology stack preferences.

## Clarifying Questions

1. **User Expectations:**
   What are the user expectations regarding the frequency of updating commit activity data? Should it be real-time or is periodic updating sufficient?

2. **User Interaction:**
   How should the application handle scenarios where a user selects a large number of repositories? Are there any specific requirements for the user interface in such cases?

3. **Data Persistence:**
   Is there a need for persistent data storage, such as saving selected repositories between user sessions?

