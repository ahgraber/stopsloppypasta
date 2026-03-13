---
id: the-ghostwriter
title: The Ghostwriter
flip: false
scenarios:
  - tag:
      class: bad
      label: ❌ Example
    textlines:
      - avatar: '👤:'
        bubbleClass: bad
        text: |
          Hey team - I did some research on our competitors this week. Here's a summary:

          **Competitive Landscape Overview**

          The market is highly competitive, with several established players and emerging challengers. Key competitors offer distinct value propositions across pricing tiers…

          _[It's a 5-page essay with handwavy assertions and no concrete details. No dates. No sources. No live pricing.]_
    verdict:
      class: bad
      text: presented as personal work · no one knows to check · hallucinated details possible
  # - tag:
  #     class: good
  #     label: ✓ Done right
  #   textlines:
  #     - avatar: 'dan:'
  #       bubbleClass: good
  #       text: >
  #         Used AI to pull together an overview on competitors, then verified pricing on each vendor's
  #         actual website this morning. Main thing: both Acme and Globex raised enterprise pricing
  #         since last year, so we are cheaper at the mid tier by about 20%. Worth discussing whether
  #         that is still the right positioning. Notes in the doc.
  #   verdict:
  #     class: good
  #     text: ✓ AI-assisted · personally verified · specific · opens a real conversation
---

The sender shares AI output as their own work, with no indication a chatbot wrote it.
Recipients have no reason to question it, and may act on information that is out of date, incomplete, or simply wrong.

Using AI as a ghostwriter borrows the sender's credibility.
If the content turns out to be wrong, that credibility is what gets spent.
