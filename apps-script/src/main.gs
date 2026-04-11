/**
 * Initializes the email classification system
 * Sets up necessary labels, properties, and trigger
 * @return {void}
 */
function initializeSystem() {
  try {
    console.log("System initialization started");
    
    // Define labels to create based on urgency 
    const labelsToCreate = [
      LABEL_PREFIX,                // "AI"
      CATEGORY_LABEL_PATH,         // "AI/Category"
      URGENCY_LABEL_PATH,          // "AI/Urgency"
      PROCESSED_LABEL              // "AI/Processed"
    ];
    
    // Initialize each label
    for (let i = 0; i < labelsToCreate.length; i++) {
      const labelName = labelsToCreate[i];
      
      const existingLabel = GmailApp.getUserLabelByName(labelName);
      
      if (!existingLabel) {
        // Label does not exist, create it
        GmailApp.createLabel(labelName);
        console.log("Label created: " + labelName);
      } else {
        // Label already exists
        console.log("Label already exists: " + labelName);
      }
    }
    
    console.log("Gmail label initialization completed successfully");
    
    // TODO: Set up scheduled triggers for batch processing
  } catch (error) {
    console.error("Error during system initialization: " + error.toString());
  }
}

/**
 * Loads the timestamp of the last processed email
 * Used to determine which emails to process in the next batch
 * @return {string} ISO 8601 formatted timestamp, or null if never processed
 */
function loadLastProcessedTimestamp() {
  try {
    const properties = PropertiesService.getScriptProperties();
    const timestamp = properties.getProperty(TIMESTAMP_PROPERTY_KEY);
    
    if (timestamp === null) {
      console.log("No previous timestamp found. This may be the first run.");
      return null;
    }
    
    console.log("Loaded last processed timestamp: " + timestamp);
    return timestamp;
  } catch (error) {
    console.error("Error loading timestamp: " + error.toString());
    return null;
  }
}

/**
 * Saves the timestamp of the most recently processed email
 * Updates the Properties service to track processing progress
 * @param {string} timestamp - ISO 8601 formatted timestamp to save
 * @return {void}
 */
function saveLastProcessedTimestamp(timestamp) {
  try {
    // Validate timestamp is provided and is a non-empty string
    if (!timestamp || typeof timestamp !== "string" || timestamp.trim() === "") {
      console.warn("Invalid timestamp provided. Cannot save empty or null value.");
      return;
    }
    
    const properties = PropertiesService.getScriptProperties();
    properties.setProperty(TIMESTAMP_PROPERTY_KEY, timestamp);
    
    console.log("Timestamp saved successfully: " + timestamp);
  } catch (error) {
    console.error("Error saving timestamp: " + error.toString());
  }
}

/**
 * Fetches emails from the inbox since a given timestamp
 * Retrieves unread or unprocessed emails for classification
 * @param {string} timestamp - ISO 8601 formatted timestamp to filter from
 * @return {Array<GmailThread>} Array of email threads to be classified
 */
function fetchInboxEmailsSince(timestamp) {
  try {
    let query = 'label:inbox -label:"AI/Processed"';
    
    if (timestamp != null) {
      // Convert ISO 8601 timestamp to Gmail search format (YYYY/MM/DD)
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = year + "/" + month + "/" + day;
      
      query += ' after:' + formattedDate;
    } else {
      // Default to retrieving emails from the last 1 day
      query += ' newer_than:1d';
    }
    
    console.log("Fetching emails with query: " + query);
    
    // Search with limit of 100 results per batch
    const threads = GmailApp.search(query, 0, 100);
    
    console.log("Retrieved " + threads.length + " email threads");
    
    return threads;
  } catch (error) {
    console.error("Error fetching inbox emails: " + error.toString());
    return [];
  }
}

/**
 * Builds a batch payload for Gemini API classification
 * Converts email threads into a structured format for batch processing
 * @param {Array<GmailThread>} emailThreads - Array of Gmail threads to process
 * @return {Object} Batch payload object ready for Gemini API
 */
function buildBatchPayload(emailThreads) {
  try {
    const payload = {
      requests: []
    };
    
    // Return early if no threads to process
    if (!emailThreads || emailThreads.length === 0) {
      console.log("No email threads to process");
      return payload;
    }
    
    console.log("Processing " + emailThreads.length + " threads for batch payload");
    
    // Extract data from each thread
    for (let i = 0; i < emailThreads.length; i++) {
      const thread = emailThreads[i];
      const messages = thread.getMessages();
      
      if (messages.length === 0) {
        console.warn("Thread has no messages, skipping");
        continue;
      }
      
      const firstMessage = messages[0];
      
      const threadData = {
        threadId: thread.getId(),
        subject: firstMessage.getSubject(),
        sender: firstMessage.getFrom(),
        snippet: (firstMessage.getPlainBody() || "").substring(0, 500)
      };
      
      payload.requests.push(threadData);
    }
    
    console.log("Batch payload created with " + payload.requests.length + " entries");
    
    return payload;
  } catch (error) {
    console.error("Error building batch payload: " + error.toString());
    return {
      requests: []
    };
  }
}

/**
 * Classifies emails using Google Gemini AI
 * Submits batch payload to Gemini API and retrieves classifications
 * @param {Object} batchPayload - Batch payload object from buildBatchPayload()
 * @return {Array<Object>} Classification results with email IDs and categories
 */
function classifyEmailsWithGemini(batchPayload) {
  // TODO: Submit batch request to Gemini API
  // TODO: Handle API authentication with service account or API key
  // TODO: Parse and structure classification results
  // TODO: Map results back to original email IDs
  return [];
}

/**
 * Applies classification labels to emails in Gmail
 * Creates hierarchical labels and assigns them to emails based on classification results
 * @param {Array<Object>} results - Classification results from classifyEmailsWithGemini()
 * @return {void}
 */
function applyLabelsToEmails(results) {
  // TODO: Iterate through classification results
  // TODO: Create hierarchical label structure if not exists
  // TODO: Apply category labels to emails
  // TODO: Apply urgency labels to emails
  // TODO: Apply processed label for tracking
  console.log("Labels applied to " + results.length + " emails");
}
