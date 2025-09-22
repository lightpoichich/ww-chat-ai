---
name: ww-chat-ai
description: AI-focused chat UI with streaming bubble, refined input UX, attachments, date separators, and rich styling. Simple message schema compatible with ww-chat.
keywords: [chat, ai, messaging, assistant, streaming]
---

#### ww-chat-ai

***Purpose:***
Chat interface optimized for AI assistants. Supports live streaming text, polished input UX, message grouping and date separators, attachments, and extensive styling. Integrates with WeWeb variables, events, and actions using a flat message schema.

***Features:***
- Streaming bubble via `streamingText` + `isStreaming` (transient, not persisted)
- Configurable auto-scroll (instant or smooth)
- Fixed-height, accessible input with hover/focus states and hidden scrollbars
- Image previews and file tiles for attachments
- Locale-aware date separators

***Properties:***
- User: `userName`, `userAvatar`, `userLocation`, `userStatus`('online'|'offline'|'away'|'busy'), `currentUserId`, `showSelfInHeader`
- Chat data: `chatHistory`(array of { id, text, senderId, userName, timestamp, attachments? }), `streamingText`(string)
- Mapping: `mappingMessageId`, `mappingMessageText`, `mappingSenderId`, `mappingUserName`, `mappingTimestamp`, `mappingAttachments`
- Chat settings: `allowAttachments`, `disabled`, `autoScrollBehavior`('instant'|'smooth')
- Header styles: `displayHeader`, `headerBgColor`, `headerTextColor`, `headerBorder`, `headerPadding`, `headerNameFontSize`, `headerNameFontWeight`, `headerLocationFontSize`, `headerLocationOpacity`, `headerCloseButtonColor`, `headerCloseButtonBgHover`
- Messages (others): `messageBgColor`, `messageTextColor`, `messageFontSize`, `messageFontWeight`, `messageFontFamily`, `messageBorder`, `messageRadius`
- Messages (own): `ownMessageBgColor`, `ownMessageTextColor`, `ownMessageFontSize`, `ownMessageFontWeight`, `ownMessageFontFamily`, `ownMessageBorder`, `ownMessageRadius`
- Date separator: `dateSeparatorTextColor`, `dateSeparatorLineColor`, `dateSeparatorBgColor`, `dateSeparatorBorderRadius`
- Input area: `inputBgColor`, `inputTextColor`, `inputPlaceholderColor`, `inputBorder`, `inputMaxHeight`, `inputMinHeight`, `inputBorderRadius`, `inputPlaceholder`
- Icons: `sendIcon`, `sendIconColor`, `sendIconSize`, `attachmentIcon`, `attachmentIconColor`, `attachmentIconSize`, `removeIcon`, `removeIconColor`, `removeIconSize`

***Exposed Variables:***
- chatHistory: Conversation array. (path: variables['current_element_uid-chatHistory'])
- isStreaming: Toggles streaming bubble. (path: variables['current_element_uid-isStreaming'])

***Events:***
- messageSent: Triggered on send. Payload: { "message": { ... } }
- messageReceived: Triggered when a non-self message is added. Payload: { "message": { ... } }
- messageRightClick: Triggered on message right click. Payload: { "message": { ... }, "position": { "x": 0, "y": 0 } }
- attachmentClick: Triggered when an attachment is clicked. Payload: { "attachment": { ... } }
- close: Triggered when header close is clicked. No payload

***Exposed Element Actions:***
- scrollToBottom: (smooth?: boolean) Scroll to last message. Uses element default if omitted
- clearMessages: (no args) Clear chatHistory
- addMessage: (message: object) Append a message (id auto-generated if missing)

***Notes:***
- Streaming: set `isStreaming = true`, write partials to `streamingText`; when done, set `isStreaming = false` and call `addMessage` with the final text
- Flat schema by design; participants/conversation metadata omitted for AI simplicity
- Use `autoScrollBehavior` for default scrolling; actions can override per call

***Example:***
{"uid":"elt_ai_chat","tag":"ww-chat-ai","name":"AI Chat","props":{"default":{"currentUserId":"user-1","displayHeader":true,"allowAttachments":true,"chatHistory":[{"id":"m1","text":"Hello!","senderId":"user-1","userName":"You","timestamp":"2024-01-01T10:00:00Z"}]}},"styles":{"default":{"messageBgColor":"#ffffff","ownMessageBgColor":"#ddf4ff","inputBorder":"1px solid #d0d7de"}}}

Container Properties:

-   `backgroundColor`: `string` - Background color of the chat container. Default: `#f5f7fb`
-   `containerBorder`: `string` - Border of the chat container. Default: `1px solid #e2e8f0`
-   `containerBorderRadius`: `string` - Border radius of the chat container. Default: `8px`
-   `containerShadow`: `string` - Box shadow of the chat container. Default: `0 2px 8px rgba(0, 0, 0, 0.05)`
-   `fontFamily`: `string` - Font family used throughout the chat. Default: `inherit`

Header Style Properties:

-   `displayHeader`: `boolean` - Whether to display the chat header. Default: `true`
-   `headerBgColor`: `string` - Background color of the chat header. Default: `#ffffff`
-   `headerTextColor`: `string` - Text color in the chat header. Default: `#1e293b`
-   `headerBorder`: `string` - Border of the chat header. Default: `1px solid #e2e8f0`
-   `headerBoxShadow`: `string` - Box shadow of the chat header. Default: `0 1px 2px rgba(0, 0, 0, 0.05)`
-   `headerPadding`: `string` - Padding of the chat header. Default: `12px 16px`
-   `headerNameFontSize`: `string` - Font size of the user name in header. Default: `1rem`
-   `headerNameFontWeight`: `string` - Font weight of the user name in header. Default: `600`
-   `headerLocationFontSize`: `string` - Font size of the location text in header. Default: `0.875rem`
-   `headerLocationOpacity`: `number` - Opacity of the location text in header. Default: `0.7`
-   `headerCloseButtonColor`: `string` - Color of the close button (leave empty to inherit). Default: ``
-   `headerCloseButtonBgHover`: `string` - Background color of the close button on hover. Default: `rgba(0, 0, 0, 0.05)`

Messages Area Properties:

-   `messagesAreaBgColor`: `string` - Background color of the messages area. Default: `#ffffff`
-   `messagesAreaPadding`: `string` - Padding inside the messages area. Default: `16px`
-   `messagesAreaHeight`: `string` - Height of the messages area. Use 'auto' to fill available space. Default: `auto`
-   `emptyMessageText`: `string` - Text to display when there are no messages. Default: `No messages yet`
-   `emptyMessageColor`: `string` - Color of the empty message text. Default: `#64748b`

Date Separator Properties:

-   `dateSeparatorTextColor`: `string` - Text color of the date separator. Default: `#64748b`
-   `dateSeparatorLineColor`: `string` - Color of the date separator divider line. Default: `#e2e8f0`
-   `dateSeparatorBgColor`: `string` - Background color behind the date text. Default: `#ffffff`
-   `dateSeparatorBorderRadius`: `string` - Border radius of the date separator. Default: `4px`

Message Style Properties:

-   `messageBgColor`: `string` - Background color of messages from others. Default: `#f1f5f9`
-   `messageTextColor`: `string` - Text color of messages from others. Default: `#334155`
-   `messageBorder`: `string` - Border of messages from others. Default: `1px solid #e2e8f0`
-   `ownMessageBgColor`: `string` - Background color of your own messages. Default: `#dbeafe`
-   `ownMessageTextColor`: `string` - Text color of your own messages. Default: `#1e40af`
-   `ownMessageBorder`: `string` - Border of your own messages. Default: `1px solid #bfdbfe`

Input Area Properties:

-   `inputBgColor`: `string` - Background color of the message input. Default: `#ffffff`
-   `inputTextColor`: `string` - Text color of the message input. Default: `#334155`
-   `inputPlaceholderColor`: `string` - Placeholder text color in the message input. Default: `#94a3b8`
-   `inputBorder`: `string` - Border of the message input. Default: `1px solid #e2e8f0`
-   `inputMaxHeight`: `string` - Maximum height of the input area before scrolling. Default: `120px`
-   `inputMinHeight`: `string` - Minimum height of the input area. Default: `38px`
-   `inputBorderRadius`: `string` - Border radius of the input field. Default: `20px`
-   `inputPlaceholder`: `string` - Placeholder text for the message input. Default: `Type a message...`

Icon Properties:

-   `sendIcon`: `string` - Icon for the send button. Default: `send`
-   `sendIconColor`: `string` - Color of the send button icon. Default: `#334155`
-   `sendIconSize`: `string` - Size of the send button icon. Default: `20px`
-   `attachmentIcon`: `string` - Icon for the attachment button. Default: `paperclip`
-   `attachmentIconColor`: `string` - Color of the attachment button icon. Default: `#334155`
-   `attachmentIconSize`: `string` - Size of the attachment button icon. Default: `20px`
-   `removeIcon`: `string` - Icon for the remove attachment button. Default: `x`
-   `removeIconColor`: `string` - Color of the remove attachment button icon. Default: `#f43f5e`
-   `removeIconSize`: `string` - Size of the remove attachment button icon. Default: `16px`

User Properties:

-   `userName`: `string` - Name to display for the current user. Default: `User`
-   `userAvatar`: `string` - URL of the user avatar image (initials will be used if empty). Default: ``
-   `userLocation`: `string` - Location to display under the user name (optional). Default: ``
-   `userStatus`: `string` - Current status of the user. Options: `online`, `offline`, `away`, `busy`. Default: `online`
-   `currentUserId`: `string` - Unique identifier for the current user (used to identify your messages). Default: `current-user`
-   `showSelfInHeader`: `boolean` - If enabled, shows the current user in the header instead of the chat partner. Default: `false`

Chat Settings:

-   `groupChatTemplate`: `string` - Template for group chat header text. Use {count} as placeholder for number of participants. Default: `Group Chat ({count} participants)`
-   `allowAttachments`: `boolean` - Whether to allow file attachments. Default: `false`
-   `disabled`: `boolean` - Whether the chat component is disabled. Default: `false`

Localization Properties:

-   `locale`: `string` - Locale code for date/time formatting. Supports over 40 languages and regional variants including:
    -   English (US, UK, Canada, Australia, New Zealand, Ireland, India, South Africa)
    -   French (France, Canada, Switzerland)
    -   German (Germany, Austria)
    -   Spanish
    -   Italian (Italy, Switzerland)
    -   Portuguese (Portugal, Brazil)
    -   Russian
    -   Japanese (including Hiragana)
    -   Chinese (Simplified, Hong Kong, Taiwan)
    -   Korean
    -   Arabic (multiple variants)
    -   Hindi, Bengali
    -   And many more European and Asian languages.
        Default: `enUS`
-   `timeFormat`: `string` - Format for time display using date-fns format pattern. Default: `h:mm a`
-   `todayText`: `string` - Text to display for today's date. Default: `Today`
-   `yesterdayText`: `string` - Text to display for yesterday's date. Default: `Yesterday`
-   `justNowText`: `string` - Text to display for very recent messages. Default: `just now`

Chat Data:

-   `chatHistory`: `array` - Array of message objects for the chat history. Each message contains:
    -   `id`: `string` - Unique identifier for the message
    -   `text`: `string` - Message text content
    -   `senderId`: `string` - ID of the message sender
    -   `userName`: `string` - Display name of the message sender
    -   `timestamp`: `string` - ISO timestamp of when the message was sent
    -   `attachments`: `array` (optional) - Array of attachment objects
    -   `avatar` or `avatarUrl`: `string` (optional) - URL of sender's avatar image

Message Data Mapping:

-   `mappingMessageId`: `Formula` - Formula to extract message ID from your data. Default: `context.mapping?.['id']`
-   `mappingMessageText`: `Formula` - Formula to extract message text from your data. Default: `context.mapping?.['text']`
-   `mappingSenderId`: `Formula` - Formula to extract sender ID from your data. Default: `context.mapping?.['senderId']`
-   `mappingUserName`: `Formula` - Formula to extract user name from your data. Default: `context.mapping?.['userName']`
-   `mappingTimestamp`: `Formula` - Formula to extract timestamp from your data. Default: `context.mapping?.['timestamp']`
-   `mappingAttachments`: `Formula` - Formula to extract attachments from your data. Default: `context.mapping?.['attachments']`

Events:

-   `messageSent`: {message: messageObject} - Triggered when a new message is sent
-   `messageReceived`: {message: messageObject} - Triggered when a new message is received from someone else
-   `messageRightClick`: {message: messageObject, position: {x, y}} - Triggered when a message is right-clicked
-   `attachmentClick`: {attachment: attachmentObject} - Triggered when an attachment is clicked
-   `close`: {} - Triggered when the close button in the header is clicked

Actions:

-   `scrollToBottom`: Scrolls the message area to the bottom. Args: `smooth` (boolean, optional) - Whether to use smooth scrolling animation. Default: `false`
-   `clearMessages`: Clears all messages from the chat history
-   `addMessage`: Adds a new message to the chat. Args: message (object with text, senderId, and userName properties)

Variables:

-   `chatHistory`: array - The full conversation history as an array of message objects

Special Features:

-   User status indicator (online, offline, away, busy)
-   Chat partner detection that automatically updates the header based on conversation participants
-   Group chat support with customizable display template and participant count
-   Message grouping by sender
-   Date separators with "Today", "Yesterday", or date labels, fully customizable
-   Empty message state with customizable text and styling
-   File attachments with image preview support
-   Auto-scrolling to latest messages
-   Context menu support via right-click events on messages
-   Responsive input that expands as user types
-   Shift+Enter support for multiline messages
-   Customizable styling for all elements
-   Formula-based data mapping for flexible message structure

Important Implementation Notes:

-   The chat component is designed for real-time messaging but doesn't include built-in socket connections
-   For large chat histories, consider pagination or virtual scrolling
-   The component uses reactive Vue 3 styling with v-bind for dynamic property updates
-   All styling properties are bindable for dynamic theming
-   The header will automatically display the chat partner's information based on message history
-   Right-click events provide coordinates for showing custom context menus at the correct position
-   Responsive design adapts to container size but may need additional styling for small screens

Example Basic Implementation:

```json
{
    "tag": "ww-chat",
    "content": {
        "userName": "John Doe",
        "userStatus": "online",
        "currentUserId": "john-doe",
        "displayHeader": true,
        "allowAttachments": true,
        "chatHistory": [
            {
                "id": "msg-1",
                "text": "Hello there! Welcome to our support chat.",
                "senderId": "support-agent",
                "userName": "Support Agent",
                "timestamp": "2023-06-01T11:15:00.000Z"
            }
        ]
    }
}
```

Example Styled Implementation:

```json
{
    "tag": "ww-chat",
    "content": {
        "userName": "John Doe",
        "userAvatar": "https://example.com/avatars/john.jpg",
        "userStatus": "online",
        "currentUserId": "john-doe",
        "backgroundColor": "#f0f4f8",
        "containerBorder": "1px solid #d0d7de",
        "containerBorderRadius": "12px",
        "messageBgColor": "#ffffff",
        "messageTextColor": "#24292f",
        "messageBorder": "1px solid #d0d7de",
        "ownMessageBgColor": "#ddf4ff",
        "ownMessageTextColor": "#0969da",
        "ownMessageBorder": "1px solid #54aeff",
        "emptyMessageText": "No conversations yet. Start chatting!",
        "emptyMessageColor": "#6e7781",
        "dateSeparatorTextColor": "#57606a",
        "dateSeparatorLineColor": "#d0d7de",
        "dateSeparatorBgColor": "#f0f4f8",
        "dateSeparatorBorderRadius": "12px",
        "inputBgColor": "#ffffff",
        "inputTextColor": "#24292f",
        "inputBorder": "1px solid #d0d7de"
    }
}
```

Troubleshooting:

-   **Messages showing incorrect sender:** Check that `currentUserId` matches the `senderId` in your messages
-   **Attachments not working:** Ensure `allowAttachments` is set to `true` and file URLs are accessible
-   **Chat not scrolling to bottom:** Call `scrollToBottom` action after programmatically adding messages
-   **User avatar not displaying:** Verify the avatar URL is valid (initials will be shown as fallback)
-   **Right-click event not firing:** Make sure the component is not in editing mode
-   **Group chat header not showing correctly:** Check that you have messages from multiple different senders
-   **messageReceived event not triggering:** Verify that the incoming message has a different senderId than currentUserId
