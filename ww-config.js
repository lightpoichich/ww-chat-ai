// Helper functions for attachment mapping
const __evalCode = (code, type, ctx) => {
    try {
        if (typeof code !== 'string') return undefined;
        const body = type === 'js' ? code : `return (${code});`;
        // eslint-disable-next-line no-new-func
        const fn = new Function('context', body);
        return fn(ctx);
    } catch {
        return undefined;
    }
};

const __pickTemplateMessageByMapping = (messages, mapping) => {
    if (mapping?.code && Array.isArray(messages) && messages.length) {
        for (const msg of messages) {
            const res = __evalCode(mapping.code, mapping.type || 'f', { mapping: msg });
            if (Array.isArray(res) && res.length) return msg;
        }
    }
    const fallback = messages.find(m => Array.isArray(m?.attachments) && m.attachments.length);
    return fallback || (messages.length ? messages[0] : null);
};

const __pickFirstAttachmentByMapping = (messages, mapping) => {
    if (mapping?.code && Array.isArray(messages) && messages.length) {
        for (const msg of messages) {
            const arr = __evalCode(mapping.code, mapping.type || 'f', { mapping: msg });
            if (Array.isArray(arr) && arr.length) return arr[0];
        }
    }
    const withAtt = messages.find(m => Array.isArray(m?.attachments) && m.attachments.length);
    return withAtt ? withAtt.attachments[0] : null;
};

export default {
    inherit: {
        type: 'ww-layout',
    },
    options: {
        displayAllowedValues: ['flex', 'grid', 'inline-flex', 'inline-grid'],
    },
    editor: {
        label: { en: 'Chat AI' },
        icon: 'chat',
        customStylePropertiesOrder: [
            'fontFamily',
            [
                'messagesAreaTitle',
                'messagesAreaBgColor',
                'messagesAreaPadding',
                'emptyMessageText',
                'emptyMessageColor',
            ],
            [
                'messageTitle',
                'messageShowTimestamp',
                'messageBgColor',
                'messageTextColor',
                'messageFontSize',
                'messageFontWeight',
                'messageFontFamily',
                'messageBorder',
                'messageRadius',
                'ownMessageTitle',
                'ownMessageShowTimestamp',
                'ownMessageBgColor',
                'ownMessageTextColor',
                'ownMessageFontSize',
                'ownMessageFontWeight',
                'ownMessageFontFamily',
                'ownMessageBorder',
                'ownMessageRadius',
            ],
            [
                'inputAreaTitle',
                'inputBgColor',
                'inputAreaBorder',
                'textAreaTitle',
                'textareaBorder',
                'textareaBorderHover',
                'textareaBorderFocus',
                'inputTextColor',
                'inputFontSize',
                'inputFontWeight',
                'inputFontFamily',
                'inputPlaceholderColor',
                'inputHeight',
                'inputBorderRadius',
                'inputPlaceholder',
                'inputActionAlign',
            ],
            [
                'sendTitle',
                'sendIcon',
                'sendIconColor',
                'sendIconSize',
                'attachmentTitle',
                'attachmentIcon',
                'attachmentIconColor',
                'attachmentIconSize',
                'removeTitle',
                'removeIcon',
                'removeIconColor',
                'removeIconSize',
                'imagePreviewTitle',
                'messagesAttachmentThumbMaxWidth',
                'messagesAttachmentThumbMaxHeight',
                'messagesAttachmentThumbMinWidth',
                'messagesAttachmentThumbMinHeight',
                'messagesAttachmentThumbBorderRadius',
            ],
            [
                'sendButtonTitle',
                'sendButtonBgColor',
                'sendButtonHoverBgColor',
                'sendButtonBorder',
                'sendButtonBorderRadius',
                'sendButtonSize',
                'sendButtonBoxShadow',
            ],
            [
                'attachmentButtonTitle',
                'attachmentButtonBgColor',
                'attachmentButtonHoverBgColor',
                'attachmentButtonBorder',
                'attachmentButtonBorderRadius',
                'attachmentButtonSize',
                'attachmentButtonBoxShadow',
            ],
        ],
        customSettingsPropertiesOrder: [
            [
                'chatSettingsTitle',
                'userLabel',
                'assistantLabel',
                'disabled',
                'enableMarkdown',
                'allowAttachments',
                'attachmentMode',
                'allowedAttachmentTypes',
                'autoScrollBehavior',
            ],
            [
                'chatDataTitle',
                'messages',
                'mappingMessageId',
                'mappingMessageText',
                'mappingRole',
                'mappingTimestamp',
                'mappingAttachments',
                'attachmentsDataTitle',
                'mappingAttachmentId',
                'mappingAttachmentName',
                'mappingAttachmentUrl',
                'mappingAttachmentType',
                'mappingAttachmentSize',
                'mappingAttachmentPath',
            ],
            ['streamingTitle', 'isStreaming', 'streamingText'],
            [
                'localizationTitle',
                'locale',
                'todayText',
                'yesterdayText',
                'justNowText',
                'timeFormat',
            ],
        ],
    },
    triggerEvents: [
        {
            name: 'messageSent',
            label: { en: 'On message sent' },
            event: {
                message: {
                    id: 'msg-1',
                    content: 'Hello there!',
                    role: 'user',
                    timestamp: new Date().toISOString(),
                    attachments: [
                        {
                            id: 'file-1',
                            name: 'demo.txt',
                            type: 'text/plain',
                            size: 12,
                            url: 'blob:https://example.com/...',
                        },
                    ],
                },
            },
        },
        {
            name: 'messageReceived',
            label: { en: 'On message received' },
            event: {
                message: {
                    id: 'msg-2',
                    content: 'New assistant message received',
                    role: 'assistant',
                    timestamp: new Date().toISOString(),
                    attachments: [
                        {
                            id: 'file-1',
                            name: 'result.pdf',
                            type: 'application/pdf',
                            size: 102400,
                            url: 'https://example.com/result.pdf',
                        },
                    ],
                },
            },
        },
        {
            name: 'messageRightClick',
            label: { en: 'On message right click' },
            event: {
                message: {
                    id: 'msg-1',
                    content: 'Message content',
                    role: 'user',
                    timestamp: new Date().toISOString(),
                },
                position: {
                    elementX: 50, // relative to chat element
                    elementY: 20,
                    viewportX: 320, // relative to page top-left
                    viewportY: 480,
                },
            },
        },
        {
            name: 'attachmentClick',
            label: { en: 'On attachment click' },
            event: {
                attachment: {
                    id: 'file-1',
                    name: 'document.pdf',
                    type: 'application/pdf',
                    size: 1024000,
                    url: 'https://example.com/document.pdf',
                    path: 'bucket-name/folder/document.pdf',
                },
            },
        },
        {
            name: 'pendingAttachmentClick',
            label: { en: 'On pending attachment click' },
            event: {
                attachment: {
                    name: 'image.png',
                    type: 'image/png',
                    size: 204800,
                    path: 'bucket-name/image.png',
                },
                index: 0,
            },
        },
    ],
    actions: [
        {
            action: 'scrollToBottom',
            label: { en: 'Scroll to bottom' },
            args: [
                {
                    name: 'smooth',
                    type: 'boolean',
                    label: { en: 'Smooth scroll' },
                },
            ],
        },
    ],
    properties: {
        // ======== APPEARANCE ========

        // Container styles
        fontFamily: {
            label: { en: 'Font Family' },
            type: 'FontFamily',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: 'inherit',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Font family used across the chat UI.\n\nExample: `Inter, sans-serif`',
            },
            /* wwEditor:end */
        },

        // Messages area styles
        messagesAreaTitle: {
            type: 'Title',
            label: { en: 'Messages Area' },
            section: 'style',
        },
        messagesAreaBgColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '#ffffff',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Conversation pane background.\n\nExample: `#ffffff`',
            },
            /* wwEditor:end */
        },
        messagesAreaPadding: {
            label: { en: 'Padding' },
            type: 'Spacing',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '16px',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Inner spacing around messages.\n\nExample: `16px`, `20px 16px`',
            },
            /* wwEditor:end */
        },
        emptyMessageText: {
            label: { en: 'Empty Message Text' },
            type: 'Text',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: 'No messages yet',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Text when no messages are present.\n\nExample: `No messages yet`',
            },
            /* wwEditor:end */
        },
        emptyMessageColor: {
            label: { en: 'Empty Message Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '#64748b',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Color for the empty-state text.\n\nExample: `#64748b`',
            },
            /* wwEditor:end */
        },

        // Message styles (AI/Assistant messages - no bubble by default)
        messageTitle: {
            type: 'Title',
            label: { en: 'Assistant Messages' },
            section: 'style',
        },
        messageShowTimestamp: {
            label: { en: 'Show Timestamp' },
            type: 'OnOff',
            section: 'style',
            bindable: true,
            defaultValue: true,
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Show a timestamp beside assistant messages.\n\nPossible values: **`true`**, **`false`**',
            },
            /* wwEditor:end */
        },
        messageBgColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: 'transparent',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Assistant message background (ChatGPT-style is transparent by default).\n\nExample: `transparent`, `#f1f5f9`',
            },
            /* wwEditor:end */
        },
        messageTextColor: {
            label: { en: 'Text Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Text color of assistant messages.\n\nExample: `#334155`',
            },
            /* wwEditor:end */
        },
        messageFontSize: {
            label: { en: 'Font Size' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 8, max: 100 },
                    { value: 'em', label: 'em', min: 0.5, max: 5, digits: 3, step: 0.1 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 5, digits: 3, step: 0.1 },
                ],
            },
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '0.875rem',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Font size of assistant messages.\n\nExample: `0.875rem`, `16px`',
            },
            /* wwEditor:end */
        },
        messageFontWeight: {
            label: { en: 'Font Weight' },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: '100', label: '100 (Thin)' },
                    { value: '200', label: '200 (Extra Light)' },
                    { value: '300', label: '300 (Light)' },
                    { value: '400', label: '400 (Normal)' },
                    { value: '500', label: '500 (Medium)' },
                    { value: '600', label: '600 (Semi Bold)' },
                    { value: '700', label: '700 (Bold)' },
                    { value: '800', label: '800 (Extra Bold)' },
                    { value: '900', label: '900 (Black)' },
                ],
            },
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '400',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Font weight of assistant messages.\n\nPossible values: **`100`**, **`200`**, **`300`**, **`400`**, **`500`**, **`600`**, **`700`**, **`800`**, **`900`**',
            },
            /* wwEditor:end */
        },
        messageFontFamily: {
            label: { en: 'Font Family' },
            type: 'FontFamily',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: 'inherit',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Font family for assistant messages.\n\nExample: `inherit`, `Inter, sans-serif`, `Georgia, serif`',
            },
            /* wwEditor:end */
        },
        messageBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: 'none',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Border for assistant messages.\n\nExample: `none`, `1px solid #e2e8f0`',
            },
            /* wwEditor:end */
        },
        messageRadius: {
            label: { en: 'Border Radius' },
            type: 'Spacing',
            options: {
                isCorner: true,
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 50, default: true },
                    { value: '%', label: '%', min: 0, max: 100, digits: 2, step: 1 },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '12px 12px 12px 12px',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Corner roundness of assistant messages.\n\nExample: `12px 12px 12px 12px`, `12px`',
            },
            /* wwEditor:end */
        },

        // User message styles (with bubble)
        ownMessageTitle: {
            type: 'Title',
            label: { en: 'User Messages' },
            section: 'style',
        },
        ownMessageShowTimestamp: {
            label: { en: 'Show Timestamp' },
            type: 'OnOff',
            section: 'style',
            bindable: true,
            defaultValue: true,
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Show a timestamp beside user messages.\n\nPossible values: **`true`**, **`false`**',
            },
            /* wwEditor:end */
        },
        ownMessageBgColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '#f4f4f4',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Bubble background for user messages.\n\nExample: `#f4f4f4`',
            },
            /* wwEditor:end */
        },
        ownMessageTextColor: {
            label: { en: 'Text Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '#1e1e1e',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Text color of user messages.\n\nExample: `#1e1e1e`',
            },
            /* wwEditor:end */
        },
        ownMessageFontSize: {
            label: { en: 'Font Size' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 8, max: 100 },
                    { value: 'em', label: 'em', min: 0.5, max: 5, digits: 3, step: 0.1 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 5, digits: 3, step: 0.1 },
                ],
            },
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '0.875rem',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Font size of user messages.\n\nExample: `0.875rem`, `16px`',
            },
            /* wwEditor:end */
        },
        ownMessageFontWeight: {
            label: { en: 'Font Weight' },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: '100', label: '100 (Thin)' },
                    { value: '200', label: '200 (Extra Light)' },
                    { value: '300', label: '300 (Light)' },
                    { value: '400', label: '400 (Normal)' },
                    { value: '500', label: '500 (Medium)' },
                    { value: '600', label: '600 (Semi Bold)' },
                    { value: '700', label: '700 (Bold)' },
                    { value: '800', label: '800 (Extra Bold)' },
                    { value: '900', label: '900 (Black)' },
                ],
            },
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '400',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Font weight of user messages.\n\nPossible values: **`100`**, **`200`**, **`300`**, **`400`**, **`500`**, **`600`**, **`700`**, **`800`**, **`900`**',
            },
            /* wwEditor:end */
        },
        ownMessageFontFamily: {
            label: { en: 'Font Family' },
            type: 'FontFamily',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: 'inherit',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Font family for user messages.\n\nExample: `inherit`, `Inter, sans-serif`, `Georgia, serif`',
            },
            /* wwEditor:end */
        },
        ownMessageBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '1px solid #d0d0d0',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Border of user message bubble.\n\nExample: `1px solid #d0d0d0`',
            },
            /* wwEditor:end */
        },
        ownMessageRadius: {
            label: { en: 'Border Radius' },
            type: 'Spacing',
            options: {
                isCorner: true,
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 50, default: true },
                    { value: '%', label: '%', min: 0, max: 100, digits: 2, step: 1 },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '18px 18px 18px 18px',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Border radius of user message bubble.\n\nExample: `18px 18px 18px 18px`, `12px`',
            },
            /* wwEditor:end */
        },

        // Input styles
        inputAreaTitle: {
            type: 'Title',
            label: { en: 'Input Area' },
            section: 'style',
        },
        inputBgColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '#ffffff',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Background color of input area.\n\nExample: `#ffffff`',
            },
            /* wwEditor:end */
        },
        inputAreaBorder: {
            label: { en: 'Area Border Top' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '1px solid #e2e8f0',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Top border separating messages from input.\n\nExample: `1px solid #e2e8f0`',
            },
            /* wwEditor:end */
        },
        textAreaTitle: {
            type: 'Title',
            label: { en: 'Text Area' },
            section: 'style',
        },
        textareaBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '1px solid #e2e8f0',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Border of text input.\n\nExample: `1px solid #e2e8f0`',
            },
            /* wwEditor:end */
        },
        textareaBorderHover: {
            label: { en: 'Border (Hover)' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '1px solid #cbd5e1',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Border of text input on hover.\n\nExample: `1px solid #cbd5e1`',
            },
            /* wwEditor:end */
        },
        textareaBorderFocus: {
            label: { en: 'Border (Focus)' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '1px solid #3b82f6',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Border of text input on focus.\n\nExample: `1px solid #3b82f6`',
            },
            /* wwEditor:end */
        },
        inputTextColor: {
            label: { en: 'Text Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Text color of text input.\n\nExample: `#334155`',
            },
            /* wwEditor:end */
        },
        inputFontSize: {
            label: { en: 'Font Size' },
            type: 'Length',
            section: 'style',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 8, max: 100 },
                    { value: 'em', label: 'em', min: 0.5, max: 5, digits: 3, step: 0.1 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 5, digits: 3, step: 0.1 },
                ],
            },
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '0.875rem',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Font size of text input.\n\nExample: `0.875rem`, `1rem`',
            },
            /* wwEditor:end */
        },
        inputFontWeight: {
            label: { en: 'Font Weight' },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: '100', label: '100 (Thin)' },
                    { value: '200', label: '200 (Extra Light)' },
                    { value: '300', label: '300 (Light)' },
                    { value: '400', label: '400 (Normal)' },
                    { value: '500', label: '500 (Medium)' },
                    { value: '600', label: '600 (Semi Bold)' },
                    { value: '700', label: '700 (Bold)' },
                    { value: '800', label: '800 (Extra Bold)' },
                    { value: '900', label: '900 (Black)' },
                ],
            },
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '400',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Font weight of text input.\n\nPossible values: **`100`**, **`200`**, **`300`**, **`400`**, **`500`**, **`600`**, **`700`**, **`800`**, **`900`**',
            },
            /* wwEditor:end */
        },
        inputFontFamily: {
            label: { en: 'Font Family' },
            type: 'FontFamily',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: 'inherit',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Font family of text input.\n\nExample: `inherit`, `monospace`',
            },
            /* wwEditor:end */
        },
        inputPlaceholderColor: {
            label: { en: 'Placeholder Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '#94a3b8',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Color of placeholder text in text input.\n\nExample: `#94a3b8`',
            },
            /* wwEditor:end */
        },
        inputHeight: {
            label: { en: 'Height' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '38px',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Height of text input.\n\nExample: `38px`',
            },
            /* wwEditor:end */
        },
        inputBorderRadius: {
            label: { en: 'Border Radius' },
            type: 'Spacing',
            options: {
                isCorner: true,
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 50, default: true },
                    { value: '%', label: '%', min: 0, max: 100, digits: 2, step: 1 },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '8px',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Border radius of text input.\n\nExample: `8px`, `20px`',
            },
            /* wwEditor:end */
        },
        inputPlaceholder: {
            label: { en: 'Placeholder' },
            type: 'Text',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: 'Message...',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Placeholder text shown in text input when empty.\n\nExample: `Message...`, `Ask me anything...`',
            },
            /* wwEditor:end */
        },
        inputActionAlign: {
            label: { en: 'Action Alignment' },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: 'start', label: 'Start' },
                    { value: 'end', label: 'End' },
                ],
            },
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: 'end',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Vertical alignment of action buttons beside the text input.\n\nPossible values: **`start`**, **`end`**',
            },
            /* wwEditor:end */
        },

        // Send icon
        sendTitle: {
            type: 'Title',
            label: { en: 'Send Icon' },
            section: 'style',
        },
        sendIcon: {
            label: { en: 'Icon' },
            type: 'SystemIcon',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'send',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Icon for the send button',
            },
            propertyHelp: {
                tooltip: 'Icon used for the send button.\n\nExample: `lucide/send`, `lucide/chevron-right`',
            },
            /* wwEditor:end */
        },
        sendIconColor: {
            label: { en: 'Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Send button icon color.\n\nExample: `#334155`',
            },
            /* wwEditor:end */
        },
        sendIconSize: {
            label: { en: 'Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '20px',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Send button icon size.\n\nExample: `20px`',
            },
            /* wwEditor:end */
        },
        attachmentTitle: {
            type: 'Title',
            label: { en: 'Attachment Icon' },
            section: 'style',
        },
        attachmentIcon: {
            label: { en: 'Icon' },
            type: 'SystemIcon',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'paperclip',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Icon for the attachment button',
            },
            propertyHelp: {
                tooltip: 'Icon for adding attachments button.\n\nExample: `lucide/paperclip`, `lucide/plus`',
            },
            /* wwEditor:end */
        },
        attachmentIconColor: {
            label: { en: 'Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color of the attachment button icon',
            },
            propertyHelp: {
                tooltip: 'Attachment button icon color.\n\nExample: `#334155`',
            },
            /* wwEditor:end */
        },
        attachmentIconSize: {
            label: { en: 'Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '20px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Size of the attachment button icon',
            },
            propertyHelp: {
                tooltip: 'Attachment button icon size.\n\nExample: `20px`',
            },
            /* wwEditor:end */
        },
        removeTitle: {
            type: 'Title',
            label: { en: 'Remove Attachment Icon' },
            section: 'style',
        },
        removeIcon: {
            label: { en: 'Icon' },
            type: 'SystemIcon',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'x',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Icon for the remove attachment button',
            },
            propertyHelp: {
                tooltip: 'Icon used for remove attachment button.\n\nExample: `lucide/x`, `lucide/trash`',
            },
            /* wwEditor:end */
        },
        removeIconColor: {
            label: { en: 'Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color of the remove attachment button icon',
            },
            propertyHelp: {
                tooltip: 'Remove button icon color.\n\nExample: `#334155`',
            },
            /* wwEditor:end */
        },
        removeIconSize: {
            label: { en: 'Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '16px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Size of the remove attachment button icon',
            },
            propertyHelp: {
                tooltip: 'Remove button icon size.\n\nExample: `16px`',
            },
            /* wwEditor:end */
        },

        // Image preview (thumbnails inside messages)
        imagePreviewTitle: {
            type: 'Title',
            label: { en: 'Image Preview' },
            section: 'style',
        },
        messagesAttachmentThumbMaxWidth: {
            label: { en: 'Attachment Max Width' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '250px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Maximum width of image attachment thumbnails in the messages area',
            },
            propertyHelp: {
                tooltip: 'Max width of attached images in messages.\n\nExample: `250px`',
            },
            /* wwEditor:end */
        },
        messagesAttachmentThumbMaxHeight: {
            label: { en: 'Attachment Max Height' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '200px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Maximum height of image attachment thumbnails in the messages area',
            },
            propertyHelp: {
                tooltip: 'Max height of attached images in messages.\n\nExample: `200px`',
            },
            /* wwEditor:end */
        },
        messagesAttachmentThumbMinWidth: {
            label: { en: 'Attachment Min Width' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '80px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Minimum width of image attachment thumbnails (fallback for SVGs without intrinsic dimensions)',
            },
            propertyHelp: {
                tooltip: 'Min width of attached images in messages.\n\nExample: `80px`',
            },
            /* wwEditor:end */
        },
        messagesAttachmentThumbMinHeight: {
            label: { en: 'Attachment Min Height' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '80px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Minimum height of image attachment thumbnails (fallback for SVGs without intrinsic dimensions)',
            },
            propertyHelp: {
                tooltip: 'Min height of attached images in messages.\n\nExample: `80px`',
            },
            /* wwEditor:end */
        },
        messagesAttachmentThumbBorderRadius: {
            label: { en: 'Attachment Border Radius' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '6px',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Border radius of image attachment thumbnails' },
            propertyHelp: {
                tooltip: 'Border radius of attached images in messages.\n\nExample: `6px`',
            },
            /* wwEditor:end */
        },

        // Send button styles
        sendButtonTitle: {
            type: 'Title',
            label: { en: 'Send Button' },
            section: 'style',
        },
        sendButtonBgColor: {
            label: { en: 'Background' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Background (color or gradient) of send button.\n\nExample: `#2563eb`, `linear-gradient(135deg,#3b82f6,#2563eb)`',
            },
            /* wwEditor:end */
        },
        sendButtonHoverBgColor: {
            label: { en: 'Background (Hover)' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Background of send button on hover.\n\nExample: `linear-gradient(135deg,#2563eb,#1d4ed8)`, `#1d4ed8`',
            },
            /* wwEditor:end */
        },
        sendButtonBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: 'none',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Border of send button.\n\nExample: `none`, `1px solid #e2e8f0`',
            },
            /* wwEditor:end */
        },
        sendButtonBorderRadius: {
            label: { en: 'Border Radius' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '12px',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Border radius of send button.\n\nExample: `12px`, `100%`',
            },
            /* wwEditor:end */
        },
        sendButtonSize: {
            label: { en: 'Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '42px',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Width & height of send button.\n\nExample: `42px`',
            },
            /* wwEditor:end */
        },
        sendButtonBoxShadow: {
            label: { en: 'Shadow' },
            type: 'Shadows',
            section: 'style',
            bindable: true,
            classes: true,
            responsive: true,
            defaultValue: '0 2px 4px rgba(59, 130, 246, 0.3)',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Shadow of send button.\n\nExample: `0 2px 4px rgba(59,130,246,.3)`',
            },
            /* wwEditor:end */
        },

        // Attachment button styles
        attachmentButtonTitle: {
            type: 'Title',
            label: { en: 'Attachment Button' },
            section: 'style',
        },
        attachmentButtonBgColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#f8fafc',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Background for the attachment button' },
            propertyHelp: {
                tooltip: 'Background color of attachment button.\n\nExample: `#f8fafc`',
            },
            /* wwEditor:end */
        },
        attachmentButtonHoverBgColor: {
            label: { en: 'Hover Background' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#f1f5f9',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Hover background for the attachment button' },
            propertyHelp: {
                tooltip: 'Background color of attachment button on hover.\n\nExample: `#f1f5f9`',
            },
            /* wwEditor:end */
        },
        attachmentButtonBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '1px solid #e2e8f0',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Border for the attachment button' },
            propertyHelp: {
                tooltip: 'Border of attachment button.\n\nExample: `1px solid #e2e8f0`',
            },
            /* wwEditor:end */
        },
        attachmentButtonBorderRadius: {
            label: { en: 'Border Radius' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '12px',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Border radius of the attachment button' },
            propertyHelp: {
                tooltip: 'Border radius of attachment button.\n\nExample: `12px`, `8px`',
            },
            /* wwEditor:end */
        },
        attachmentButtonSize: {
            label: { en: 'Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '42px',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Square size of the attachment button' },
            propertyHelp: {
                tooltip: 'Width & height of attachment button.\n\nExample: `42px`',
            },
            /* wwEditor:end */
        },
        attachmentButtonBoxShadow: {
            label: { en: 'Shadow' },
            type: 'Shadows',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '0 1px 2px rgba(0, 0, 0, 0.06)',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Shadow applied to the attachment button' },
            propertyHelp: {
                tooltip: 'Background shadow of attachment button.\n\nExample: `0 1px 2px rgba(0,0,0,.06)`',
            },
            /* wwEditor:end */
        },

        // ======== SETTINGS ========

        chatSettingsTitle: {
            type: 'Title',
            label: { en: 'Chat Settings' },
            section: 'settings',
        },
        userLabel: {
            label: { en: 'User Label' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: 'You',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Label for user messages.\n\nExample: `You`',
            },
            /* wwEditor:end */
        },
        assistantLabel: {
            label: { en: 'Assistant Label' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: 'Assistant',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Label for assistant messages.\n\nExample: `Assistant`',
            },
            /* wwEditor:end */
        },
        disabled: {
            label: { en: 'Disabled' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: false,
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Disable the entire chat UI and sending.\n\nPossible values: **`true`**, **`false`**',
            },
            /* wwEditor:end */
        },
        enableMarkdown: {
            label: { en: 'Enable Markdown' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: false,
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Render markdown (bold, code, links, lists). When off, newlines are kept.\n\nPossible values: **`true`**, **`false`**',
            },
            /* wwEditor:end */
        },
        allowAttachments: {
            label: { en: 'Allow Attachments' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: false,
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Enable file attachments in the input area.\n\nPossible values: **`true`**, **`false`**',
            },
            /* wwEditor:end */
        },
        attachmentMode: {
            label: { en: 'Attachment Mode' },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'single', label: 'Single File' },
                    { value: 'multiple', label: 'Multiple Files' },
                ],
            },
            defaultValue: 'multiple',
            bindable: true,
            hidden: content => !content?.allowAttachments,
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Allow single or multiple attachments' },
            propertyHelp: {
                tooltip:
                    'Control whether users can attach one file or multiple files.\n\n**Single File:** Only one attachment can be added at a time. Selecting a new file replaces the previous one.\n\n**Multiple Files:** Users can add multiple attachments to a single message.',
            },
            /* wwEditor:end */
        },
        allowedAttachmentTypes: {
            label: { en: 'Allowed File Types' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: '', // Empty = all types allowed
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Comma-separated MIME types or file extensions' },
            propertyHelp: {
                tooltip:
                    'Leave empty to allow all file types. Otherwise, specify allowed types as comma-separated MIME types or file extensions.\n\n**Examples:**\n- `image/*` - All image types\n- `image/png,image/jpeg` - PNG and JPEG only\n- `.pdf,.doc,.docx` - PDF and Word documents\n- `image/*,.pdf,.xlsx` - Images, PDF, and Excel files\n- `audio/*,video/*` - Audio and video files\n\n**Common MIME types:**\n- Images: `image/png`, `image/jpeg`, `image/gif`, `image/webp`\n- PDF: `application/pdf`\n- Documents: `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`\n- Spreadsheets: `application/vnd.ms-excel`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`',
            },
            /* wwEditor:end */
        },
        autoScrollBehavior: {
            label: { en: 'Auto Scroll Behavior' },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'auto', label: 'Instant' },
                    { value: 'smooth', label: 'Smooth' },
                ],
            },
            bindable: true,
            defaultValue: 'auto',
            /* wwEditor:start */
            propertyHelp: {
                tooltip: 'Scroll behavior for new messages.\n\nPossible values: **`auto`**, **`smooth`**',
            },
            /* wwEditor:end */
        },

        // Chat data
        chatDataTitle: {
            type: 'Title',
            label: { en: 'Chat Data' },
            section: 'settings',
        },
        messages: {
            label: { en: 'Messages' },
            type: 'Info',
            section: 'settings',
            bindable: true,
            bindingValidation: {
                type: 'array',
                tooltip: 'Array of message objects: [{ text: string, role: "user"|"assistant", timestamp?: string }]',
            },
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'A list of role-based messages that represent the conversation.\n\nEach message typically includes **`content`**, **`role`** (**`user`** or **`assistant`**), and **`timestamp`**. Optionally can include **`attachments`**.\n\n**Example:**\n```json\n[\n  { "content": "Hello!", "role": "user", "timestamp": "2025-06-01T10:30:00Z" },\n  {\n    "content": "Hi there!",\n    "role": "assistant",\n    "timestamp": "2025-06-01T10:30:05Z",\n    "attachments": [\n      { "id": "img-1", "name": "chart.png", "url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e", "type": "image/png", "size": 245600 }\n    ]\n  }\n]\n```',
            },
            /* wwEditor:end */
        },
        mappingMessageId: {
            label: { en: 'Message ID' },
            type: 'Formula',
            options: content => ({
                template: Array.isArray(content.messages) && content.messages.length ? content.messages[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['id']",
            },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'formula',
                tooltip: 'Formula to extract the unique message ID from each message object',
            },
            propertyHelp: {
                tooltip:
                    'Mapping to the unique message ID in your **Messages** data.\n\n**Example mapping:** `context.mapping?.["id"]`\n\n**Example value:** `"msg-1"`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => !boundProps.messages,
        },
        mappingMessageText: {
            label: { en: 'Message Text' },
            type: 'Formula',
            options: content => ({
                template: Array.isArray(content.messages) && content.messages.length ? content.messages[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['content']",
            },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'formula',
                tooltip: 'Formula to extract the message text from each message object',
            },
            propertyHelp: {
                tooltip:
                    'Mapping to the text content in your **Messages** data.\n\n**Example mapping:** `context.mapping?.["content"]`\n\n**Example value:** `"Hello, how can I help?"`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => !boundProps.messages,
        },
        mappingRole: {
            label: { en: 'Message Role' },
            type: 'Formula',
            options: content => ({
                template: Array.isArray(content.messages) && content.messages.length ? content.messages[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['role']",
            },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'formula',
                tooltip: 'Formula to extract the role from each message object',
            },
            propertyHelp: {
                tooltip:
                    'Mapping to the role in your **Messages** data.\n\n**Example mapping:** `context.mapping?.["role"]`\n\n**Example values:** `"user"` or `"assistant"`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => !boundProps.messages,
        },
        mappingTimestamp: {
            label: { en: 'Timestamp' },
            type: 'Formula',
            options: content => ({
                template: Array.isArray(content.messages) && content.messages.length ? content.messages[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['timestamp']",
            },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'formula',
                tooltip: 'Formula to extract the timestamp from each message object',
            },
            propertyHelp: {
                tooltip:
                    'Mapping to the timestamp in your **Messages** data.\n\n**Example mapping:** `context.mapping?.["timestamp"]`\n\n**Example value:** `"2025-10-02T10:30:00Z"`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => !boundProps.messages,
        },
        mappingAttachments: {
            label: { en: 'Attachments' },
            type: 'Formula',
            options: content => {
                const messages = Array.isArray(content.messages) ? content.messages : [];
                const mapping = content?.mappingAttachments;
                return { template: __pickTemplateMessageByMapping(messages, mapping) };
            },
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['attachments']",
            },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'formula',
                tooltip: 'Formula to extract the attachments array from each message object',
            },
            propertyHelp: {
                tooltip:
                    'Mapping to the attachments in your **Messages** data.\n\n**Example mapping:** `context.mapping?.["attachments"]`\n\n**Example value:**\n```json\n[{ "id": "file-1", "name": "image.png", "type": "image/png", "size": 204800, "url": "https://example.com/file.png" }]\n```',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => !boundProps.messages,
        },

        // Attachments Data
        attachmentsDataTitle: {
            type: 'Title',
            label: { en: 'Attachments Data' },
            section: 'settings',
            hidden: (content, _, boundProps) => {
                const hasMessages = !!boundProps?.messages;
                const hasAttachmentsMapping = !!content?.mappingAttachments?.code;
                return !(hasMessages && hasAttachmentsMapping);
            },
        },
        mappingAttachmentId: {
            label: { en: 'ID' },
            type: 'Formula',
            options: content => {
                const messages = Array.isArray(content.messages) ? content.messages : [];
                const mapping = content?.mappingAttachments;
                return { template: __pickFirstAttachmentByMapping(messages, mapping) };
            },
            defaultValue: { type: 'f', code: "context.mapping?.['id']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the attachment unique id' },
            propertyHelp: {
                tooltip:
                    'Mapping to the unique ID in your **Attachments** data.\n\n**Example mapping:** `context.mapping?.["id"]`\n\n**Example value:** `"file-1"`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => {
                const hasMessages = !!boundProps?.messages;
                const hasAttachmentsMapping = !!content?.mappingAttachments?.code;
                return !(hasMessages && hasAttachmentsMapping);
            },
        },
        mappingAttachmentName: {
            label: { en: 'Name' },
            type: 'Formula',
            options: content => {
                const messages = Array.isArray(content.messages) ? content.messages : [];
                const mapping = content?.mappingAttachments;
                return { template: __pickFirstAttachmentByMapping(messages, mapping) };
            },
            defaultValue: { type: 'f', code: "context.mapping?.['name']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the attachment display name' },
            propertyHelp: {
                tooltip:
                    'Mapping to the display name in your **Attachments** data.\n\n**Example mapping:** `context.mapping?.["name"]`\n\n**Example value:** `"report.pdf"`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => {
                const hasMessages = !!boundProps?.messages;
                const hasAttachmentsMapping = !!content?.mappingAttachments?.code;
                return !(hasMessages && hasAttachmentsMapping);
            },
        },
        mappingAttachmentUrl: {
            label: { en: 'URL' },
            type: 'Formula',
            options: content => {
                const messages = Array.isArray(content.messages) ? content.messages : [];
                const mapping = content?.mappingAttachments;
                return { template: __pickFirstAttachmentByMapping(messages, mapping) };
            },
            defaultValue: { type: 'f', code: "context.mapping?.['url'] ?? context.mapping?.['href']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the attachment URL' },
            propertyHelp: {
                tooltip:
                    'Mapping to the file URL in your **Attachments** data.\n\n**Example mapping:** `context.mapping?.["url"]`\n\n**Example value:** `"https://example.com/file.pdf"`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => {
                const hasMessages = !!boundProps?.messages;
                const hasAttachmentsMapping = !!content?.mappingAttachments?.code;
                return !(hasMessages && hasAttachmentsMapping);
            },
        },
        mappingAttachmentType: {
            label: { en: 'MIME Type' },
            type: 'Formula',
            options: content => {
                const messages = Array.isArray(content.messages) ? content.messages : [];
                const mapping = content?.mappingAttachments;
                return { template: __pickFirstAttachmentByMapping(messages, mapping) };
            },
            defaultValue: { type: 'f', code: "context.mapping?.['type'] ?? context.mapping?.['mime']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the attachment MIME type' },
            propertyHelp: {
                tooltip:
                    'Mapping to the MIME type in your **Attachments** data.\n\n**Example mapping:** `context.mapping?.["type"]`\n\n**Example value:** `"image/png"`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => {
                const hasMessages = !!boundProps?.messages;
                const hasAttachmentsMapping = !!content?.mappingAttachments?.code;
                return !(hasMessages && hasAttachmentsMapping);
            },
        },
        mappingAttachmentSize: {
            label: { en: 'Size (bytes)' },
            type: 'Formula',
            options: content => {
                const messages = Array.isArray(content.messages) ? content.messages : [];
                const mapping = content?.mappingAttachments;
                return { template: __pickFirstAttachmentByMapping(messages, mapping) };
            },
            defaultValue: { type: 'f', code: "context.mapping?.['size']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the attachment size in bytes' },
            propertyHelp: {
                tooltip:
                    'Mapping to the size in your **Attachments** data.\n\n**Example mapping:** `context.mapping?.["size"]`\n\n**Example value:** `204800`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => {
                const hasMessages = !!boundProps?.messages;
                const hasAttachmentsMapping = !!content?.mappingAttachments?.code;
                return !(hasMessages && hasAttachmentsMapping);
            },
        },
        mappingAttachmentPath: {
            label: { en: 'Path (file location)' },
            type: 'Formula',
            options: content => {
                const messages = Array.isArray(content.messages) ? content.messages : [];
                const mapping = content?.mappingAttachments;
                return { template: __pickFirstAttachmentByMapping(messages, mapping) };
            },
            defaultValue: { type: 'f', code: "context.mapping?.['path']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the attachment path/location (e.g., Supabase bucket path)' },
            propertyHelp: {
                tooltip:
                    'Mapping to the file path/location in your **Attachments** data (e.g., Supabase storage path).\n\n**Example mapping:** `context.mapping?.["path"]`\n\n**Example value:** `bucket-name/folder/document.pdf`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => {
                const hasMessages = !!boundProps?.messages;
                const hasAttachmentsMapping = !!content?.mappingAttachments?.code;
                return !(hasMessages && hasAttachmentsMapping);
            },
        },

        // Streaming
        streamingTitle: {
            type: 'Title',
            label: { en: 'Streaming' },
            section: 'settings',
        },
        isStreaming: {
            label: { en: 'Is Streaming' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: false,
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Controls visibility of the temporary assistant streaming bubble. Set **`true`** while generating.\n\nPossible values: **`true`**, **`false`**',
            },
            /* wwEditor:end */
        },
        streamingText: {
            label: { en: 'Streaming Text' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: '',
            hidden: content => !content.isStreaming,
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Live content being streamed from your AI API while **Is Streaming** is **`true`**.\n\nExample: **`…`**, **`Typing…`**, **`The answer is…`**',
            },
            /* wwEditor:end */
        },

        // Localization & Dates
        localizationTitle: {
            type: 'Title',
            label: { en: 'Localization & Dates' },
            section: 'settings',
        },
        locale: {
            label: { en: 'Language / Locale' },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    // English variants
                    { value: 'enUS', label: 'English (United States)' },
                    { value: 'enGB', label: 'English (United Kingdom)' },
                    { value: 'enCA', label: 'English (Canada)' },
                    { value: 'enAU', label: 'English (Australia)' },
                    { value: 'enNZ', label: 'English (New Zealand)' },
                    { value: 'enIE', label: 'English (Ireland)' },
                    { value: 'enIN', label: 'English (India)' },
                    { value: 'enZA', label: 'English (South Africa)' },
                    // French variants
                    { value: 'fr', label: 'Français (France)' },
                    { value: 'frCA', label: 'Français (Canada)' },
                    { value: 'frCH', label: 'Français (Switzerland)' },
                    // German variants
                    { value: 'de', label: 'Deutsch (Germany)' },
                    { value: 'deAT', label: 'Deutsch (Austria)' },
                    // Spanish
                    { value: 'es', label: 'Español' },
                    // Italian variants
                    { value: 'it', label: 'Italiano (Italy)' },
                    { value: 'itCH', label: 'Italiano (Switzerland)' },
                    // Portuguese variants
                    { value: 'pt', label: 'Português (Portugal)' },
                    { value: 'ptBR', label: 'Português (Brazil)' },
                    // Russian
                    { value: 'ru', label: 'Русский' },
                    // East Asian languages
                    { value: 'ja', label: '日本語' },
                    { value: 'jaHira', label: '日本語 (Hiragana)' },
                    { value: 'zh', label: '中文 (Simplified)' },
                    { value: 'zhHK', label: '中文 (Hong Kong)' },
                    { value: 'zhTW', label: '中文 (Traditional)' },
                    { value: 'ko', label: '한국어' },
                    // Arabic variants
                    { value: 'ar', label: 'العربية' },
                    { value: 'arDZ', label: 'العربية (Algeria)' },
                    { value: 'arEG', label: 'العربية (Egypt)' },
                    { value: 'arMA', label: 'العربية (Morocco)' },
                    { value: 'arSA', label: 'العربية (Saudi Arabia)' },
                    { value: 'arTN', label: 'العربية (Tunisia)' },
                    // Indian subcontinent languages
                    { value: 'hi', label: 'हिन्दी' },
                    { value: 'bn', label: 'বাংলা' },
                    // Other European
                    { value: 'nl', label: 'Nederlands (Netherlands)' },
                    { value: 'nlBE', label: 'Nederlands (Belgium)' },
                    { value: 'sv', label: 'Svenska' },
                    { value: 'nb', label: 'Norsk (Bokmål)' },
                    { value: 'nn', label: 'Norsk (Nynorsk)' },
                    { value: 'da', label: 'Dansk' },
                    { value: 'fi', label: 'Suomi' },
                    { value: 'el', label: 'Ελληνικά' },
                    { value: 'tr', label: 'Türkçe' },
                    { value: 'cs', label: 'Čeština' },
                    { value: 'pl', label: 'Polski' },
                    { value: 'ro', label: 'Română' },
                    { value: 'hu', label: 'Magyar' },
                    // Southeast Asian
                    { value: 'vi', label: 'Tiếng Việt' },
                    { value: 'th', label: 'ไทย' },
                    { value: 'id', label: 'Bahasa Indonesia' },
                    { value: 'ms', label: 'Bahasa Melayu' },
                    // Other
                    { value: 'uk', label: 'Українська' },
                ],
            },
            defaultValue: 'enUS',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Language/locale code' },
            propertyHelp: {
                tooltip:
                    'Select the locale for date and time formatting.\n\nThis affects how dates like "Today", "Yesterday" and relative times are displayed.',
            },
            /* wwEditor:end */
        },
        todayText: {
            label: { en: 'Today Text' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: 'Today',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Text displayed for today\'s date' },
            propertyHelp: {
                tooltip:
                    'Custom text to display when a message is from today.\n\n**Default:** `Today`\n\n**Example:** `Aujourd\'hui` (French)',
            },
            /* wwEditor:end */
        },
        yesterdayText: {
            label: { en: 'Yesterday Text' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: 'Yesterday',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Text displayed for yesterday\'s date' },
            propertyHelp: {
                tooltip:
                    'Custom text to display when a message is from yesterday.\n\n**Default:** `Yesterday`\n\n**Example:** `Hier` (French)',
            },
            /* wwEditor:end */
        },
        justNowText: {
            label: { en: '"Just Now" Text' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: 'just now',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Text displayed for very recent messages' },
            propertyHelp: {
                tooltip:
                    'Custom text to display when a message was sent moments ago.\n\n**Default:** `just now`\n\n**Example:** `à l\'instant` (French)',
            },
            /* wwEditor:end */
        },
        timeFormat: {
            label: { en: 'Time Format' },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'h:mm a', label: '12-hour (09:30)' },
                    { value: 'HH:mm', label: '24-hour (09:30)' },
                    { value: 'h:mm:ss a', label: '12-hour with seconds (09:30:45)' },
                    { value: 'HH:mm:ss', label: '24-hour with seconds (09:30:45)' },
                ],
            },
            defaultValue: 'h:mm a',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Time format pattern' },
            propertyHelp: {
                tooltip:
                    'Select the time format for displaying message timestamps.\n\n**12-hour:** Uses AM/PM (e.g., 3:30 PM)\n\n**24-hour:** Uses military time (e.g., 15:30)',
            },
            /* wwEditor:end */
        },
    },
};
