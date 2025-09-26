---
name: ww-chat-ai
description: AI chat (assistant + client) with minimal, backgroundless styling and streaming-friendly UI.
keywords: [chat, ai, assistant, streaming, minimal]
---

#### ww-chat-ai

***Purpose:***
Unified AI chat UI with two roles: `client` and `ai`. Optional header (via `displayHeader`), always-present messages area, and a message input with send/attachment actions. Minimal, ChatGPT-like defaults (no chat background by default).

***Properties:***
- fontFamily: string – Global font family. Example: 'Inter, sans-serif'
- displayHeader: boolean – Toggle header visibility. Default: false
- messages: array – Conversation data. Example: [{ id, text, senderId, timestamp, attachments? }]
- isStreaming: boolean – If true, shows `streamingText` as a live last AI message.
- streamingText: string – The partial content updated during streaming.
- allowAttachments: boolean – Enable file attachments. Example: true
- disabled: boolean – Disable input/actions. Example: false
- autoScrollBehavior: 'auto'|'smooth' – Scroll mode for new messages. Example: 'auto'

- headerBgColor: string – Header background. Example: '#ffffff'
- headerTextColor: string – Header text color. Example: '#1e293b'
- headerBorder: string – Header bottom border. Example: '1px solid #e2e8f0'
- headerPadding: string – Header padding. Example: '12px 16px'
- headerNameFontSize: string – Header name size. Example: '1rem'
- headerNameFontWeight: string – Header name weight. Example: '600'
- headerLocationFontSize: string – Header location size. Example: '0.875rem'
- headerLocationOpacity: number – Location opacity. Example: 0.7
- headerCloseButtonColor: string – Close icon color. Example: '#64748b'
- headerCloseButtonBgHover: string – Close hover bg. Example: 'rgba(0,0,0,.05)'
- headerShowCloseButton: boolean – Show the header close button. Example: true

- messagesAreaBgColor: string – Messages area background. Default: 'transparent'
- messagesAreaPadding: string – Messages area padding. Example: '16px'
- messagesAttachmentThumbMaxWidth: string – Max width for image attachment thumbnails in messages. Example: '220px'
- messagesAttachmentThumbMaxHeight: string – Max height for image attachment thumbnails in messages. Example: '160px'
 - messagesAttachmentThumbBorderRadius: string – Border radius of image thumbnails. Example: '6px'

- messageBgColor: string – Others’ message bg. Default: 'transparent'
- messageTextColor: string – Others’ message text. Example: '#334155'
- messageBorder: string – Others’ message border. Example: '1px solid #e2e8f0'
- messageRadius: string – Others’ border radius. Example: '18px'
- messageFontSize: string – Others’ font size. Example: '0.9375rem'
- messageFontWeight: string – Others’ font weight. Example: '400'
- messageFontFamily: string – Others’ font family. Example: 'inherit'

- ownMessageBgColor: string – Own message bg. Default: 'transparent'
- ownMessageTextColor: string – Own message text. Example: '#ffffff'
- ownMessageBorder: string – Own message border. Example: 'none'
- ownMessageRadius: string – Own border radius. Example: '18px'
- ownMessageFontSize: string – Own font size. Example: '0.9375rem'
- ownMessageFontWeight: string – Own font weight. Example: '400'
- ownMessageFontFamily: string – Own font family. Example: 'inherit'

- dateSeparatorTextColor: string – Date text color. Example: '#64748b'
- dateSeparatorLineColor: string – Date line color. Example: '#e2e8f0'
- dateSeparatorBgColor: string – Date bg. Default: 'transparent'
- dateSeparatorBorderRadius: string – Date radius. Example: '8px'

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
- inputBorderRadius: string – Textarea radius. Example: '20px'
- inputPlaceholder: string – Placeholder text. Example: 'Type a message...'
- inputActionAlign: 'start'|'center'|'end' – Vertical alignment of action buttons. Example: 'end'

- sendIcon: string – Send icon name. Example: 'send'
- sendIconColor: string – Send icon color. Example: '#334155'
- sendIconSize: string – Send icon size. Example: '20px'
- attachmentIcon: string – Attachment icon name. Example: 'paperclip'
- attachmentIconColor: string – Attachment icon color. Example: '#334155'
- attachmentIconSize: string – Attachment icon size. Example: '20px'
- removeIcon: string – Remove icon name. Example: 'x'
- removeIconColor: string – Remove icon color. Example: '#f43f5e'
- removeIconSize: string – Remove icon size. Example: '12px'

***Notes (thumbnails):***
- Applies to image attachments displayed inside message bubbles; non-image file chips keep their current layout.
- Defaults preserve existing behavior: width 250px, height 200px.
- CSS variables for advanced theming: `--ww-chat-attachment-thumb-max-width`, `--ww-chat-attachment-thumb-max-height`.
  Also: `--ww-chat-attachment-thumb-radius`.

- sendButtonBgColor: string – Send button bg/gradient. Example: 'linear-gradient(135deg, #3b82f6, #2563eb)'
- sendButtonHoverBgColor: string – Send button hover bg. Example: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
- sendButtonBorder: string – Send button border. Example: 'none'
- sendButtonBorderRadius: string – Send button radius. Example: '12px'
- sendButtonSize: string – Send button size. Example: '42px'
- sendButtonBoxShadow: string – Send button shadow. Example: '0 2px 4px rgba(59,130,246,.3)'
- attachmentButtonBgColor: string – Attachment button bg. Example: '#f8fafc'
- attachmentButtonHoverBgColor: string – Attachment button hover bg. Example: '#f1f5f9'
- attachmentButtonBorder: string – Attachment button border. Example: '1px solid #e2e8f0'
- attachmentButtonBorderRadius: string – Attachment button radius. Example: '12px'
- attachmentButtonSize: string – Attachment button size. Example: '42px'
- attachmentButtonBoxShadow: string – Attachment button shadow. Example: '0 1px 2px rgba(0,0,0,.06)'

- emptyMessageText: string – Text when no messages. Example: 'No messages yet'
- emptyMessageColor: string – Empty state color. Example: '#64748b'

- locale: string – Date-fns locale key. Example: 'enUS'
- timeFormat: string – Time display format. Example: 'h:mm a'
- todayText: string – Label for today. Example: 'Today'
- yesterdayText: string – Label for yesterday. Example: 'Yesterday'
- justNowText: string – Label for recent time. Example: 'just now'

- mappingMessageId: Formula – Extract message id. Default: context.mapping?.['id']
- mappingMessageText: Formula – Extract text. Default: context.mapping?.['text']
- mappingSenderId: Formula – Extract sender id ('client'|'ai'). Default: context.mapping?.['senderId']
- mappingTimestamp: Formula – Extract timestamp. Default: context.mapping?.['timestamp']
- mappingAttachments: Formula – Extract attachments. Default: context.mapping?.['attachments']

Attachments Data (visible only when Attachments mapping is set):
- mappingAttachmentId: Formula – Attachment id. Example: context.mapping?.['id']
- mappingAttachmentName: Formula – Attachment name. Example: context.mapping?.['name']
- mappingAttachmentUrl: Formula – Attachment URL. Example: context.mapping?.['url'] ?? context.mapping?.['href']
- mappingAttachmentType: Formula – Attachment MIME type. Example: context.mapping?.['type'] ?? context.mapping?.['mime']
 - mappingAttachmentSize: Formula – Attachment size in bytes. Example: context.mapping?.['size'] ?? context.mapping?.['length']

***Context data (only accessible to this element and its children):***
- context.local.data?.['chat']?.['messages'] – Normalized messages with display info.
 - context.local.data?.['chat']?.['conversation'] – Conversation metadata (two roles: client and ai).
- context.local.data?.['chat']?.['currentUser'] – Current user info.
- context.local.data?.['chat']?.['utils'] – State: messageCount, isDisabled, allowAttachments, displayHeader.

***Exposed Variables:***
- chatState: Full chat state (messages, conversation, currentUser, utils). Path: variables['<current_element_uid>-chatState']

***Events:***
– messageSent: Triggered when the user sends a message. Payload: { message }
- messageReceived: Triggered when a new message appears in `messages` from another sender. Payload: { message }
- messageRightClick: Triggered on right-click on a message. Payload: { message, position }
  - position.elementX / position.elementY: coordinates relative to the chat container
  - position.viewportX / position.viewportY: coordinates relative to the page top-left
- attachmentClick: Triggered when a message attachment is clicked. Payload: { attachment }
- pendingAttachmentClick: Triggered when a pending (unsent) attachment in the input area is clicked. Payload: { attachment, index } where `attachment` is a File object.
- close: Triggered when the header close button is clicked. Payload: {}

***Exposed Element Actions:***
- scrollToBottom: (smooth?: boolean) Scroll to the latest message; uses `autoScrollBehavior` when arg omitted.

***Notes:***
- Attachment id is optional; the renderer falls back to the array index when no id is provided.
- Event payload shapes:
  - messageSent: attachments is an array of File objects (local uploads only). No id/url are included since File already carries name/type/size.
  - messageReceived: attachments are metadata objects (id, name, url, type, size) suitable for rendering remote assets.
- IMPORTANT: Do NOT add a custom message input. The component already includes a built-in input area with textarea, send button, and attachment support. Adding another input leads to duplicated UI and broken events.
- Messages area is always rendered; the header is controlled by `displayHeader`.
- Enter sends; Shift+Enter inserts a newline.
- Attachment File objects may not be visible in some inspectors; you can still read file.name, file.type, and file.size.

***Example***:
<elements>
{"uid":"0","tag":"ww-chat-ai","settings":{},"props":{"default":{"locale":"enUS","disabled":false,"messages":[{"id":"m1","text":"Hello!","senderId":"client","timestamp":"2025-08-29T08:11:48.015Z"}],"isStreaming":true,"streamingText":"Thinking…","displayHeader":false,"messagesAreaBgColor":"transparent","messageBgColor":"transparent","ownMessageBgColor":"transparent","messageBorder":"none","ownMessageBorder":"none"}}}
</elements>
