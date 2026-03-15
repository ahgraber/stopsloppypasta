---
heading: Why it matters
table:
  headers:
    - ''
    - As a Recipient
    - As a Sender
    - Feedback loop
  rows:
    - label: Effort
      cells:
        - |
          Previously, effort to read was balanced by the effort to write.
          Now LLMs make writing "free" and increase the effort to read due to additional verification burden.
        - |
          Writing requires effort, which contributes to comprehension.
          LLMs increase cognitive debt by reducing struggle.
        - |
          Sender's skipped effort becomes recipient's added effort, increasing frustration as incidence increases.
    - label: Trust
      cells:
        - |
          LLM propensity for hallucination and capability to bullshit convincingly mean that "trust but verify" is broken.
          All correspondence must be untrusted by default.
        - |
          What you share directly influences your reputation.
          Sharing raw LLM output - especially unvetted - burns your credibility.
        - |
          Eroding trust from LLM sloppypasta is the modern 'Boy Who Cried Wolf.'
quotes:
  - text: |
      "For the longest time, writing was more expensive than reading.
      If you encountered a body of written text, you could be sure that at the very least, a human spent some time writing it down.
      The text used to have an innate proof-of-thought, a basic token of humanity."
    cite: — Alex Martsinovich
    citeLink:
      href: https://distantprovince.by/posts/its-rude-to-show-ai-output-to-people/
      text: It's rude to show AI output to people
  - text: |
      "Cognitive effort — and even getting painfully stuck — is likely important for fostering mastery."
    cite: — Anthropic
    citeLink:
      href: https://www.anthropic.com/research/AI-assistance-coding-skills
      text: How AI assistance impacts the formation of coding skills
  - text: |
      "A polished AI response feels dismissive even if the content is correct"
    cite: — Blake Stockton
    citeLink:
      href: https://www.blakestockton.com/ai-writing-etiquette-manifesto/
      text: AI Writing Etiquette Manifesto
  - text: |
      "I think it's rude to publish text that you haven't even read yourself.
      I won't publish anything that will take someone longer to read than it took me to write."
    cite: — Simon Willison
    citeLink:
      href: https://simonwillison.net/2023/Aug/27/wordcamp-llms/#personal-ai-ethics
      text: Personal AI Ethics
---

Sharing raw AI output is like eating junk food: it's easy and may feel good, but it's not in your best interest.
You'll negatively influence your relationship with the recipient, and do yourself a disservice by reducing your own comprehension.

Before LLMs, writing took effort.
Authors spent time and effort considering and selecting their words with intention; time and effort that was balanced by that spent by the audience as they read.
This balance is broken with LLMs; the effort to produce text is effectively free, but the effort required to read the text hasn't changed.
[The increasing verbosity of LLMs](https://epoch.ai/data-insights/output-length) further increases the effort asymmetry.
In some circumstances (like pasting raw LLM output into a chat thread), the sloppypasta effectively becomes a filibuster, crowding out the existing conversation and blocking the viewport.

Writing is thinking.
The writing process forces the author to work through their thoughts, building their comprehension and retention.
[Multiple](https://www.media.mit.edu/publications/your-brain-on-chatgpt/) [studies](https://www.anthropic.com/research/AI-assistance-coding-skills) have found that delegating tasks to LLMs creates cognitive debt.
Shortcutting thinking with LLMs ultimately reduces comprehension of and recall about the delegated subject.

Before LLMs, trust was the default.
Authors wrote from their personal expertise and perspective, and readers could judge an author's understanding of the subject based on the coherence of their writing.
LLMs generate the most probable next token given an overarching goal to be helpful, which explains their propensity for hallucination ([confabulation](https://pmc.ncbi.nlm.nih.gov/articles/PMC10619792/)) and why many people feel that [LLMs are bullshit generators](https://machine-bullshit.github.io/).
Modern LLMs are typically provided tools to help them look up grounding information that reduces (but does not eradicate) their likelihood to outright make up facts during their responses.
But that still doesn't solve the trust problem; the reader still has no way to know what the sender checked and what they didn't.
LLM responses, therefore, cannot be trusted by default and compound the effort asymmetry on the reader by adding a verification tax.

Beyond accuracy, LLMs write authoritatively with the tone and confidence of an expert.
This adds further uncertainty to the reader's burden; they have no way to gauge the sender's actual level of expertise with the subject matter.
The result is a further erosion of trust, because the AI's voice removes signal that recipients previously used to distinguish expertise from plausible-sounding slop.

Formerly, "Trust but verify" ruled.
Readers would trust until that trust was broken; the author was trustworthy or they weren't.
However, shared LLM output obfuscates the chain of trust.
Did the prompter do the appropriate due diligence to validate the LLM response?
If problems or errors are discovered, who is to blame, the prompter or the AI?
Was it an oversight, a missed verification step, or was verification skipped altogether?
The uncertainty means the recipient doesn't know what they can trust, what has or has not been verified; they must treat everything as untrusted.
Just like the Boy Who Cried Wolf, once the trust is broken, the uncertainty spreads to all future messages from the sender.

Assumptions of balanced effort and presumed trust are no longer guaranteed in a post-LLM world.
Sloppypasta creates a compounding negative feedback loop where the sender forfeits learning and credibility while the recipient burns effort and loses trust.
Receiving raw AI output feels _bad_ due to the cognitive dissonance of having these assumptions violated.
