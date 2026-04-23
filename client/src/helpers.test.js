/**
 * @fileoverview Unit tests for client-side helpers.js
 *
 * Tests cover:
 *  - extractPostFromChildren
 *  - getTimeDiff
 *  - convertHoursToText
 *  - toggleDiv
 *  - urlsInText
 *  - filterUrl
 *  - getCommentReplies
 */

import {
    extractPostFromChildren,
    getTimeDiff,
    convertHoursToText,
    toggleDiv,
    urlsInText,
    filterUrl,
    getCommentReplies
} from './helpers';

// ---------------------------------------------------------------------------
// extractPostFromChildren
// ---------------------------------------------------------------------------

describe('extractPostFromChildren', () => {
    /** Builds a minimal Reddit API "child" wrapper object. */
    const makeChild = (overrides = {}) => ({
        data: {
            author: 'testAuthor',
            created_utc: 1609459200,
            media: null,
            name: 't3_abc123',
            num_comments: 42,
            over_18: false,
            permalink: '/r/test/comments/abc123/',
            id: 'abc123',
            selftext: 'Hello world',
            selftext_html: '<p>Hello world</p>',
            stickied: false,
            subreddit: 'test',
            title: 'Test Post Title',
            ups: 100,
            url: 'https://example.com',
            downs: 5,
            ...overrides
        }
    });

    it('maps a single child to the expected shape', () => {
        const [post] = extractPostFromChildren([makeChild()]);
        expect(post.author).toBe('testAuthor');
        expect(post.title).toBe('Test Post Title');
        expect(post.upvotes).toBe(100);
        expect(post.downvotes).toBe(5);
        expect(post.reddit_id).toBe('abc123');
        expect(post.id).toBe(0); // sequential counter starts at 0
    });

    it('assigns sequential numeric IDs starting from 0', () => {
        const posts = extractPostFromChildren([makeChild(), makeChild(), makeChild()]);
        expect(posts[0].id).toBe(0);
        expect(posts[1].id).toBe(1);
        expect(posts[2].id).toBe(2);
    });

    it('returns an empty array for an empty children list', () => {
        expect(extractPostFromChildren([])).toEqual([]);
    });

    it('throws when called with a non-array argument', () => {
        expect(() => extractPostFromChildren(null)).toThrow();
    });

    it('includes all expected fields on each post object', () => {
        const [post] = extractPostFromChildren([makeChild()]);
        const requiredKeys = [
            'author', 'created_utc', 'id', 'media', 'name', 'num_comments',
            'over_18', 'permalink', 'reddit_id', 'selftext', 'selftext_html',
            'stickied', 'subreddit', 'title', 'upvotes', 'url', 'downvotes'
        ];
        requiredKeys.forEach(key => {
            expect(post).toHaveProperty(key);
        });
    });
});

// ---------------------------------------------------------------------------
// getTimeDiff
// ---------------------------------------------------------------------------

describe('getTimeDiff', () => {
    it('returns 0 when created_time equals the current time', () => {
        const nowSeconds = Math.floor(Date.now() / 1000);
        const diff = getTimeDiff(nowSeconds);
        // Allow a tiny tolerance for test execution time
        expect(diff).toBeGreaterThanOrEqual(0);
        expect(diff).toBeLessThan(0.1);
    });

    it('returns approximately 1 for a post created 1 hour ago', () => {
        const oneHourAgoSeconds = Math.floor(Date.now() / 1000) - 3600;
        const diff = getTimeDiff(oneHourAgoSeconds);
        expect(diff).toBeCloseTo(1, 1);
    });

    it('returns a positive value for a past timestamp', () => {
        const pastSeconds = Math.floor(Date.now() / 1000) - 7200;
        expect(getTimeDiff(pastSeconds)).toBeGreaterThan(0);
    });
});

// ---------------------------------------------------------------------------
// convertHoursToText
// ---------------------------------------------------------------------------

describe('convertHoursToText', () => {
    it('returns "X minutes ago" for less than 1 hour', () => {
        expect(convertHoursToText(0.5)).toBe('30 minutes ago');
    });

    it('returns "0 minutes ago" for exactly 0 hours', () => {
        expect(convertHoursToText(0)).toBe('0 minutes ago');
    });

    it('returns "X hours ago" for 1 to 23 hours', () => {
        expect(convertHoursToText(3)).toBe('3 hours ago');
        expect(convertHoursToText(23)).toBe('23 hours ago');
    });

    it('returns "X days ago" for 1 to 29 days', () => {
        expect(convertHoursToText(24)).toBe('1 days ago');
        expect(convertHoursToText(24 * 15)).toBe('15 days ago');
    });

    it('returns "X months ago" for 1 to 11 months', () => {
        expect(convertHoursToText(24 * 30)).toBe('1 months ago');
        expect(convertHoursToText(24 * 30 * 6)).toBe('6 months ago');
    });

    it('returns "X years ago" for 1 year or more', () => {
        expect(convertHoursToText(24 * 30 * 12)).toBe('1 years ago');
        expect(convertHoursToText(24 * 30 * 12 * 3)).toBe('3 years ago');
    });
});

// ---------------------------------------------------------------------------
// toggleDiv (DOM-dependent – requires jsdom)
// ---------------------------------------------------------------------------

describe('toggleDiv', () => {
    beforeEach(() => {
        // Reset the document body before each test
        document.body.innerHTML = '';
    });

    it('hides a visible div on first toggle', () => {
        document.body.innerHTML = '<div id="target"></div>';
        const div = document.getElementById('target');
        div.style.display = 'block';
        toggleDiv('target');
        expect(div.style.display).toBe('none');
    });

    it('shows a hidden div on toggle', () => {
        document.body.innerHTML = '<div id="target" style="display:none"></div>';
        const div = document.getElementById('target');
        toggleDiv('target');
        expect(div.style.display).toBe('block');
    });

    it('does not throw when the element is not found', () => {
        expect(() => toggleDiv('nonExistentId')).not.toThrow();
    });
});

// ---------------------------------------------------------------------------
// urlsInText
// ---------------------------------------------------------------------------

describe('urlsInText', () => {
    it('returns the input text unchanged for plain text', () => {
        expect(urlsInText('hello world')).toBe('hello world');
    });

    it('returns an empty string for the string "null"', () => {
        expect(urlsInText('null')).toBe('');
    });

    it('returns the original value for null input (passthrough)', () => {
        expect(urlsInText(null)).toBeNull();
    });

    it('returns the original value for undefined input (passthrough)', () => {
        expect(urlsInText(undefined)).toBeUndefined();
    });

    it('decodes HTML entities', () => {
        // "&amp;" should become "&"
        const result = urlsInText('&amp;');
        expect(result).toBe('&');
    });
});

// ---------------------------------------------------------------------------
// filterUrl
// ---------------------------------------------------------------------------

describe('filterUrl', () => {
    it('strips the https:// scheme', () => {
        expect(filterUrl('https://example.com/path')).toBe('example.com/path');
    });

    it('strips the http:// scheme', () => {
        expect(filterUrl('http://example.com')).toBe('example.com');
    });

    it('strips "www." prefix after scheme removal', () => {
        expect(filterUrl('https://www.example.com')).toBe('example.com');
    });

    it('does not strip non-www subdomains', () => {
        expect(filterUrl('https://api.example.com')).toBe('api.example.com');
    });

    it('returns the input unchanged when there is no scheme', () => {
        expect(filterUrl('example.com')).toBe('example.com');
    });
});

// ---------------------------------------------------------------------------
// getCommentReplies
// ---------------------------------------------------------------------------

describe('getCommentReplies', () => {
    it('returns an empty array when the element has no replies', () => {
        expect(getCommentReplies({ replies: null })).toEqual([]);
        expect(getCommentReplies({})).toEqual([]);
    });

    it('filters out "more" kind children', () => {
        const element = {
            replies: {
                data: {
                    children: [
                        { kind: 'more', data: { body: 'load more' } }
                    ]
                }
            }
        };
        expect(getCommentReplies(element)).toEqual([]);
    });

    it('extracts a single reply with the expected shape', () => {
        const element = {
            replies: {
                data: {
                    children: [
                        {
                            kind: 't1',
                            data: {
                                body: 'A reply',
                                author: 'replyAuthor',
                                id: 'reply1'
                            }
                        }
                    ]
                }
            }
        };
        const replies = getCommentReplies(element);
        expect(replies).toHaveLength(1);
        expect(replies[0].body).toBe('A reply');
        expect(replies[0].author).toBe('replyAuthor');
        // Replies array is initialised to []
        expect(replies[0].replies).toEqual([]);
    });

    it('recursively extracts nested replies', () => {
        const element = {
            replies: {
                data: {
                    children: [
                        {
                            kind: 't1',
                            data: {
                                body: 'Parent reply',
                                author: 'parentAuthor',
                                replies: {
                                    data: {
                                        children: [
                                            {
                                                kind: 't1',
                                                data: {
                                                    body: 'Child reply',
                                                    author: 'childAuthor'
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        };
        const replies = getCommentReplies(element);
        expect(replies[0].replies).toHaveLength(1);
        expect(replies[0].replies[0].body).toBe('Child reply');
    });
});
