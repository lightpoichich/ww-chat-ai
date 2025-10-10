---
name: ww-chat-ai
description: ChatGPT-style AI chat interface with role-based messaging (user/assistant), streaming support, attachments, and date separators.
keywords: [chat, ai, assistant, chatgpt, openai, streaming, conversation, attachments]
---

#### ww-chat-ai

***Purpose:***
AI-focused chat UI with ChatGPT-style design: transparent assistant messages, user message bubbles, role-based system (user/assistant), real-time streaming support for OpenAI-style responses, optional attachments for vision/document AI models, and date separators.

***Properties:***

**Chat Settings:**
- userLabel: string – Label for user messages. Example: 'You'
- assistantLabel: string – Label for AI assistant messages. Example: 'Assistant'
- disabled: boolean – Disable input/actions. Example: false
- allowAttachments: boolean – Enable file attachments (for vision models, document analysis). Example: false
- enableMarkdown: boolean – Enable markdown rendering with syntax highlighting. When false, uses white-space: pre-line to respect \n. Example: false
- autoScrollBehavior: 'auto'|'smooth' – Scroll mode for new messages. Example: 'auto'

**Chat Data:**
- messages: array – Conversation data with role-based messages. Example: [{ content: 'Hello', role: 'user', timestamp: '2025-01-15T10:30:00Z' }]
- mappingMessageId: Formula – Extract unique message ID. Default: context.mapping?.['id']
- mappingMessageText: Formula – Extract message content text. Default: context.mapping?.['content']
- mappingRole: Formula – Extract message role ('user' or 'assistant'). Default: context.mapping?.['role']
- mappingTimestamp: Formula – Extract timestamp. Default: context.mapping?.['timestamp']
- mappingAttachments: Formula – Extract attachments array from message. Default: context.mapping?.['attachments']
- mappingAttachmentId: Formula – Extract attachment ID field. Default: context.mapping?.['id']
- mappingAttachmentName: Formula – Extract attachment name field. Default: context.mapping?.['name']
- mappingAttachmentUrl: Formula – Extract attachment URL field. Default: context.mapping?.['url']
- mappingAttachmentType: Formula – Extract attachment MIME type. Default: context.mapping?.['type']
- mappingAttachmentSize: Formula – Extract attachment size in bytes. Default: context.mapping?.['size']

**Streaming:**
- isStreaming: boolean – Indicates if AI is currently streaming a response. Example: false
- streamingText: string|string[] – Current streaming text from AI (bindable to OpenAI stream). Supports string or array (uses first element if array). Example: 'The answer is...'

**Style - Messages Area:**
- fontFamily: string – Global font family. Example: 'Inter, sans-serif'
- messagesAreaBgColor: string – Messages area background. Example: '#ffffff'
- messagesAreaPadding: string – Messages area padding. Example: '16px'
- emptyMessageText: string – Text when no messages. Example: 'No messages yet'
- emptyMessageColor: string – Empty state color. Example: '#64748b'

**Style - Date Separators:**
- dateSeparatorTextColor: string – Date separator text color. Example: '#64748b'
- dateSeparatorLineColor: string – Date separator line color. Example: '#e2e8f0'
- dateSeparatorBgColor: string – Date separator background. Example: '#ffffff'
- dateSeparatorBorderRadius: string – Date separator border radius. Example: '8px'

**Style - Assistant Messages (ChatGPT-style):**
- messageBgColor: string – Assistant message background. Example: 'transparent' (default: no bubble)
- messageTextColor: string – Assistant message text. Example: '#334155'
- messageBorder: string – Assistant message border. Example: 'none' (default: no border)
- messageRadius: string – Assistant border radius. Example: '0px'
- messageFontSize: string – Assistant font size. Example: '0.875rem'
- messageFontWeight: string – Assistant font weight. Example: '400'
- messageFontFamily: string – Assistant font family. Example: 'inherit'
- messageShowTimestamp: boolean – Show timestamp for assistant messages. Example: true

**Style - User Messages (Bubble):**
- ownMessageBgColor: string – User message background. Example: '#f4f4f4'
- ownMessageTextColor: string – User message text. Example: '#1e1e1e'
- ownMessageBorder: string – User message border. Example: '1px solid #d0d0d0'
- ownMessageRadius: string – User border radius. Example: '18px'
- ownMessageFontSize: string – User font size. Example: '0.875rem'
- ownMessageFontWeight: string – User font weight. Example: '400'
- ownMessageFontFamily: string – User font family. Example: 'inherit'
- ownMessageShowTimestamp: boolean – Show timestamp for user messages. Example: true

**Style - Attachment Thumbnails:**
- messagesAttachmentThumbMaxWidth: string – Max width for attachment thumbnails. Example: '250px'
- messagesAttachmentThumbMaxHeight: string – Max height for attachment thumbnails. Example: '200px'
- messagesAttachmentThumbBorderRadius: string – Border radius for thumbnails. Example: '6px'

**Style - Input Area:**
- inputBgColor: string – Input area container bg. Example: '#ffffff'
- inputAreaBorder: string – Input area top border. Example: '1px solid #e2e8f0'
- textareaBorder: string – Textarea border. Example: '1px solid #e2e8f0'
- textareaBorderHover: string – Textarea hover border. Example: '1px solid #cbd5e1'
- textareaBorderFocus: string – Textarea focus border. Example: '1px solid #3b82f6'
- inputTextColor: string – Textarea text color. Example: '#334155'
- inputFontSize: string – Textarea font size. Example: '0.875rem'
- inputFontWeight: string – Textarea font weight. Example: '400'
- inputFontFamily: string – Textarea font family. Example: 'inherit'
- inputPlaceholderColor: string – Placeholder color. Example: '#94a3b8'
- inputHeight: string – Textarea height. Example: '38px'
- inputBorderRadius: string – Textarea radius. Example: '8px'
- inputPlaceholder: string – Placeholder text. Example: 'Message...'
- inputActionAlign: 'start'|'end' – Vertical alignment of send button. Example: 'end'

**Style - Send Button:**
- sendIcon: string – Send icon name. Example: 'send'
- sendIconColor: string – Send icon color. Example: '#334155'
- sendIconSize: string – Send icon size. Example: '20px'
- sendButtonBgColor: string – Send button bg/gradient. Example: 'linear-gradient(135deg, #3b82f6, #2563eb)'
- sendButtonHoverBgColor: string – Send button hover bg. Example: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
- sendButtonBorder: string – Send button border. Example: 'none'
- sendButtonBorderRadius: string – Send button radius. Example: '12px'
- sendButtonSize: string – Send button size. Example: '42px'
- sendButtonBoxShadow: string – Send button shadow. Example: '0 2px 4px rgba(59,130,246,.3)'

**Style - Attachment Button:**
- attachmentIcon: string – Attachment icon name. Example: 'paperclip'
- attachmentIconColor: string – Attachment icon color. Example: '#334155'
- attachmentIconSize: string – Attachment icon size. Example: '20px'
- removeIcon: string – Remove attachment icon name. Example: 'x'
- removeIconColor: string – Remove icon color. Example: '#334155'
- removeIconSize: string – Remove icon size. Example: '16px'
- attachmentButtonBgColor: string – Attachment button bg. Example: '#f8fafc'
- attachmentButtonHoverBgColor: string – Attachment button hover. Example: '#f1f5f9'
- attachmentButtonBorder: string – Attachment button border. Example: '1px solid #e2e8f0'
- attachmentButtonBorderRadius: string – Attachment button radius. Example: '12px'
- attachmentButtonSize: string – Attachment button size. Example: '42px'
- attachmentButtonBoxShadow: string – Attachment button shadow. Example: '0 1px 2px rgba(0,0,0,.06)'

***Context data (only accessible to this element and its children):***
- context.local.data?.['chat']?.messages - Array of all messages with isOwn, isFirst, isLast properties
- context.local.data?.['chat']?.utils.messageCount - Total number of messages
- context.local.data?.['chat']?.utils.isDisabled - Whether chat is disabled

***Exposed Variables:***
- chatState: ***READ ONLY*** Contains messages array and utils object. (path: variables['current_element_uid-chatState'])

***Events:***
- messageSent: Triggered when the user sends a message. Payload: { message: { id, content, role: 'user', timestamp, attachments?: File[] } }
- messageReceived: Triggered when a new assistant message is detected. Payload: { message: { id, content, role: 'assistant', timestamp, attachments? } }
- attachmentClick: Triggered when user clicks an attachment in a message. Payload: { attachment: { id, name, url, type, size } }
- pendingAttachmentClick: Triggered when user clicks a pending attachment before sending. Payload: { attachment: File, index }
- messageRightClick: Triggered when user right-clicks a message. Payload: { message, position: { elementX, elementY, viewportX, viewportY } }

***Exposed Element Actions:***
- scrollToBottom: (smooth?: boolean) Scroll to the latest message; uses `autoScrollBehavior` when arg omitted.
- addMessage: (message: { content, role, timestamp?, id?, ...rest }) Add a message programmatically to the chat. Accepts both 'content' and 'text' fields for backwards compatibility.

***Notes:***
- **Role-based system**: Messages use `role` property with values 'user' or 'assistant' (not participants)
- **ChatGPT-style by default**: Assistant messages have transparent background and no border; user messages have bubble style
- **Streaming support**: Bind `isStreaming` and `streamingText` to show real-time AI responses from OpenAI or similar APIs. `streamingText` accepts both string and string[] (uses first element if array)
- **Message content field**: Uses `content` field (OpenAI API standard) instead of `text`. Backwards compatible via `addMessage` action
- **Attachments in events**: `messageSent` event includes attachments as File[] objects (not metadata), ready for base64 encoding with FileReader
- **Markdown rendering**: Enable `enableMarkdown` to render bold, italic, code blocks, links, lists, headers with syntax highlighting. When disabled, newlines (\n) are still respected via CSS
- **Attachments for AI**: Enable `allowAttachments` for vision models (ChatGPT Vision, Claude with vision) or document analysis
- **Date separators**: Automatically shown between messages from different days
- **Message right-click**: Use for custom context menus or message actions
- **All styles configurable**: Despite ChatGPT defaults, you can fully customize appearance via properties
- Enter sends message; Shift+Enter inserts newline
- Component includes built-in input area; do NOT add custom message input
- No header or participants system (simplified for AI chat use cases)

***Example:***
<elements>
{"uid":"chat-1","tag":"ww-chat-ai","name":"Chat AI","props":{"default":{"messages":{"js":"return variables['messages-variable']"},"userLabel":"You","assistantLabel":"AI Assistant","enableMarkdown":true,"allowAttachments":true,"isStreaming":{"js":"return variables['is-streaming']"},"streamingText":{"js":"return variables['stream-text']"},"fontFamily":"Inter, sans-serif","messagesAreaBgColor":"#ffffff","messageBgColor":"transparent","messageTextColor":"#334155","ownMessageBgColor":"#f4f4f4","ownMessageTextColor":"#1e1e1e","inputPlaceholder":"Ask me anything...","autoScrollBehavior":"smooth"}},"styles":{"default":{"width":"100%","height":"600px","display":"flex"}}}
</elements>

Expected messages data structure: [{"content":"Hello","role":"user","timestamp":"2025-01-15T10:30:00Z"},{"content":"Hi there!","role":"assistant","timestamp":"2025-01-15T10:30:05Z","attachments":[{"id":"img-1","name":"chart.png","url":"https://example.com/chart.png","type":"image/png","size":245600}]}]
