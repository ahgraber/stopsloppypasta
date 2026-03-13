---
id: the-eager-beaver
title: The Eager Beaver
flip: false
scenarios:
  - tag:
      class: bad
      label: ❌ Example
    textlines:
      - avatar: '#strategy'
        bubbleClass: ctx
        text: The team is mid-discussion about whether to expand into the German market.
      - avatar: '👤:'
        bubbleClass: bad
        text: |
          I asked Claude about this! Here's what it said:

          Expanding into the German market presents both significant opportunities and notable challenges. Germany is the largest economy in the EU and offers a robust consumer base. However, businesses should consider the following key factors:

          **1. Regulatory Environment**

          Germany has strict regulations including GDPR compliance, local labour laws...

          _[6 more sections follow. None mention your company, your product, your budget, or reference the discussion already underway.]_
    verdict:
      class: bad
      text: buries the live discussion · unrequested · generic
---

A conversation participant wants to contribute to the topic at hand, so they ask a chatbot and share whatever comes back.
The intention is good - they genuinely want to help - but the wall of generic AI text they contributed blocks the discussion already underway.
Now other participants have to scroll past it to continue, or stop to read and validate it.

It feels helpful to send.
It creates work to receive.
