# facebook.build essay: research + first draft ("the future of social media")

Scout task `fbb-social-essay-research`. Documentation only. Nothing was built, and the `askprateek/facebook.build` repo was not touched (no commits, branches or pushes).

**Bottom line:** People complain about the same five things in Reddit and Hacker News threads, and the peer-reviewed work backs most of it up: bots, engagement-ranked feeds that reward anger, data use people can't see, friendships reduced to forwarding clips, and a specific nostalgia for small forums. The essay draft below (about 1,450 words) argues the captain's thesis from that evidence. It closes with seven principles and doesn't pitch a product. Six refinement questions for the captain are at the end, each with a recommendation.

---

## 0. Method and how the URLs were checked

- **Reddit:** reddit.com blocks automated reads from this machine. `curl` got HTTP 403, headless Chrome got "You've been blocked by network security", and headed Chrome got a reCAPTCHA, which I did not try to solve. I found posts with the public **Arctic Shift** Reddit archive API (`https://arctic-shift.photon-reddit.com/api/posts/search`, `/api/comments/search`, `/api/posts/ids`) and quoted only from the text it returned. Then I checked **every Reddit URL cited here** against reddit.com itself through the permalink's public Atom feed (`<permalink>.rss`, HTTP 200). For each URL I confirmed that the live page title matches and that a phrase from the quote appears in the live content. The results are in the verification table in §1.7. Scores and comment counts come from the archive snapshot and may have changed since.
- **Hacker News:** I searched with the Algolia HN API (`hn.algolia.com/api/v1/search`) and pulled threads through `/api/v1/items/<id>`. Every HN URL returned HTTP 200 from `news.ycombinator.com` with a matching `<title>`.
- **Studies and surveys:** Pew, Thales/Imperva, NBER, AEA, arXiv and the Guardian were fetched directly (HTTP 200), and the quoted figures were grepped out of the page text. PNAS, Science, Science Advances and OUP sit behind Cloudflare and refused both curl and headless Chrome (403 / "Just a moment..."). For those, I confirmed the DOI and title through the Crossref API, read the abstract through the Europe PMC API, and I link the **PubMed Central / PubMed** copy, which resolves (HTTP 200).
- Dropped: anything I could not open and read. That includes the Atlantic's 2021 "Dead Internet Theory" piece (403), Reddit posts whose body was `[removed]`, and claims I remembered but could not find in a fetched source.
- **Dates:** the live data runs to October 2026. Many Reddit posts are from 2025–2026.

**About representativeness:** Reddit and HN are self-selected. r/nosurf exists for people unhappy with their screen use, and HN skews technical and older. These threads show what people who are bothered say, in their own words. They do not tell you how many people feel that way. The surveys and studies carry the "how widespread / how real" weight, so each theme rates the two kinds of evidence separately.

---

## 1. Research by theme

### 1.1 Bots and fake accounts

**First-person voices**
- *"the entire post will be inundated with identical accounts saying the exact same inflammatory things. It just happens way too fast for it to be natural."* The poster says the accounts have "generic names and bios, were created in the last year or so." r/Twitter, 78 pts, 2026-05. https://www.reddit.com/r/Twitter/comments/1tsurwo/the_site_is_just_90_bots_at_this_point/
- *"Either these people are the worst that humanity has to offer--which seems too coincidental that they'd pop up all at once--or these are bots that are designed to fire up engagement."* r/nosurf, 22 pts, 2026-04. https://www.reddit.com/r/nosurf/comments/1sgymaz/is_reddit_full_of_antagonistic_bots/
- Paraphrase: a 15-year Reddit user noticed that juicy posts in big advice subs come from accounts "with no history" whose author never replies, and concluded they are fake, "creative writing rage bait." r/nosurf, 93 pts, 2024-03. https://www.reddit.com/r/nosurf/comments/1bni628/has_anyone_else_noticed_most_of_the_bigger/
- *"There already seems to be loads of posts that get upvoted by other bots, and commented by even other bots, to push a specific service in one of the comments - just to look authentic."* r/socialmedia, 18 pts, 2025-11. https://www.reddit.com/r/socialmedia/comments/1olslqs/bots_overrun_socials_whats_next/
- Paraphrase: an HN commenter on a 697-point "Dead Internet Theory" thread argues that bots increased on Reddit after the 2023 API protest removed moderator tools, and that the platform has little incentive to remove them because traffic drives ad revenue. This is speculation, but it is widely shared. https://news.ycombinator.com/item?id=46672628 (thread: https://news.ycombinator.com/item?id=46671731)

**Data**
- Thales / Imperva *2025 Bad Bot Report*: "Automated bot traffic surpassed human-generated traffic for the first time in a decade, constituting 51% of all web traffic in 2024," and malicious bots "now account for 37% of all internet traffic – a significant increase from 32% in 2023." https://cpl.thalesgroup.com/about-us/newsroom/2025-imperva-bad-bot-report-ai-internet-traffic (report page: https://www.imperva.com/resources/resource-library/reports/2025-bad-bot-report/)

**Strength:** Strong that the feeling is common and growing; the bot complaints get the most recent posts of any theme. Moderate on the facts. The Imperva figure covers *all web traffic* (scrapers, credential stuffing and so on), not the share of social posts or accounts written by bots. No credible public number exists for "percent of social media replies that are bots". The essay should not claim one, and the draft doesn't.

### 1.2 Engagement farming, ragebait and algorithmic feeds

**First-person voices**
- *"What should I feel? What should I be angry about? Please decide for me"*. Title: "Scrolling through a feed is asking for the algorithm to tell you what to think about today." r/nosurf, 155 pts, 2022-05. https://www.reddit.com/r/nosurf/comments/um9z9t/scrolling_through_a_feed_is_asking_for_the/
- *"It's almost as if they want me to stay on the app or website constantly defending myself or just watching out of hate."* r/nosurf, 125 pts, 2023-11. https://www.reddit.com/r/nosurf/comments/187u02g/does_anyone_else_feel_like_most_of_the_internet/
- *"The platform, once a hub for genuine interaction, has become an energy-draining battleground."* (on paid-verification engagement farming). r/Twitter, 59 pts, 2023-08. https://www.reddit.com/r/Twitter/comments/15vfwn2/engagement_farming_is_king_now/
- The wish, stated early: *"If I didn't want to see someone's feed I wouldn't follow them. Why can't we just have posts in chronological order?"* (title). r/socialmedia, 47 pts, 2016-06. https://www.reddit.com/r/socialmedia/comments/4qmc8l/really_hating_instagrams_new_algorithm_if_i_didnt/

**Data**
- Milli et al., *PNAS Nexus* 2025 (preregistered audit): relative to a reverse-chronological baseline, Twitter's engagement-based ranking "amplifies emotionally charged, out-group hostile content that users say makes them feel worse about their political out-group," and "users do not prefer the political tweets selected by the algorithm." https://pmc.ncbi.nlm.nih.gov/articles/PMC11894805/ (preprint: https://arxiv.org/abs/2305.16941)
- Rathje, Van Bavel & van der Linden, *PNAS* 2021: across 2.7M posts, out-group posts were shared about twice as often, and "Each individual term referring to the political out-group increased the odds of a social media post being shared by 67%." https://pmc.ncbi.nlm.nih.gov/articles/PMC8256037/
- Brady et al., *Science Advances* 2021: "positive social feedback for outrage expressions increases the likelihood of future outrage expressions." https://pmc.ncbi.nlm.nih.gov/articles/PMC8363141/
- **Counterpoint (keep the essay honest):** Guess et al., *Science* 2023. Moving consenting users to chronological feeds during the 2020 US election "substantially decreased the time they spent on the platforms," but "did not significantly alter levels of issue polarization, affective polarization, political knowledge, or other key attitudes" over 3 months. https://pubmed.ncbi.nlm.nih.gov/37498999/
- Policy signal: the Guardian (2026-09-11) reports that Australia's government announced reforms, dubbed "my feed, my way", "that would force social media platforms to allow users to opt-out of algorithms." https://www.theguardian.com/media/2026/sep/11/i-turned-off-my-instagram-algorithm-opt-out-social-media-reforms-australia

**Strength:** This is the strongest theme. Peer-reviewed work shows that engagement ranking amplifies hostile content and that outrage gets rewarded. The honest caveat is that chronological order alone did not measurably change attitudes in the biggest experiment. The essay draws its argument from this: a feed should not be ranked by engagement, and chronological order is a reasonable default but not a cure.

### 1.3 Privacy and data use

**First-person voices**
- Paraphrase plus quote: a user searched their own Reddit username and found an AI summary that had worked out their state, cars, university and moderated subs, *"inferred by connecting thousands of comments I'd made over roughly seven years."* They bulk-deleted over 5,000 comments. r/privacy, 1,153 pts, 2026-07. https://www.reddit.com/r/privacy/comments/1uxgfy8/i_deleted_over_5000_comments_and_200_posts_from/
- *"Back in those days, it was rare to know even the first name of my friend, only their handle. Now we just craft our posts carefully hoping it's not used against you in the future."* HN, 2018. https://news.ycombinator.com/item?id=17334634
- The bot fix colliding with privacy: "UK government to require EVERYONE to use a passport for social media in order to police under 16 ban" (title). r/privacy, 1,382 pts / 1,080 comments, 2026-10. https://www.reddit.com/r/privacy/comments/1wy0vil/uk_government_to_require_everyone_to_use_a/
- The wish: "Australians able to opt out of targeted ads and erase their data under proposed privacy reforms" (title), 2,792 pts, 2023-02. https://www.reddit.com/r/privacy/comments/113nrsy/australians_able_to_opt_out_of_targeted_ads_and/
- Perception, not fact: a widely shared belief that phones listen to conversations for ads (*"my girlfriend complaining about my mattress... 1 day later, I get ads for new mattresses"*). r/privacy, 149 pts, 2023-11. https://www.reddit.com/r/privacy/comments/1850tol/devices_are_definitely_listening_to_create/. **Use only as evidence of distrust, never as evidence that phones listen.** The claim is disputed and I did not verify it.

**Data**
- Pew Research Center, *How Americans View Data Privacy* (2023-10-18): "Some 67% say they understand little to nothing about what companies are doing with their personal data, up from 59%"; "most Americans are concerned about how companies and the government use their information"; 71% have little to no trust that tech leaders will be held accountable by government for data missteps. https://www.pewresearch.org/internet/2023/10/18/how-americans-view-data-privacy/

**Strength:** Strong survey backing (Pew, nationally representative US sample). The useful insight for the essay is the **tension**: the popular fix for bots, ID verification, is itself a privacy threat, and r/privacy's highest-voted 2026 threads are about exactly that. The essay should not call for real-name or ID-checked social media.

### 1.4 Loss of real conversation and small-community feel

**First-person voices**
- *"All my friends engage in social activities only so that they can make a reel or post out of it... I loathe how human interaction has lost a sense of authenticity."* r/nosurf, 233 pts, 2025-02. https://www.reddit.com/r/nosurf/comments/1ij8gck/socialising_with_friends_when_you_are_not_on/
- Paraphrase: after deleting two big apps, a user "nearly lost touch with everybody"; friends text only sporadically and keep telling them to come back to the app. r/nosurf, 225 pts, 2026-07. https://www.reddit.com/r/nosurf/comments/1v5lw2m/has_anybody_deleted_both_facebook_and_instagram/
- Paraphrase: after deleting social media, a user's friends stopped inviting them, because invitations went out "in the group chat / on the event page / in the story." r/nosurf, 598 pts, 2025-11. https://www.reddit.com/r/nosurf/comments/1p6u74p/deleted_social_media_and_apparently_stopped/
- *"i was just a relay station for other people's content... that's not a personality that's a router."* A group chat of close friends had become "almost entirely reels." r/nosurf, 196 pts, 2026-05. https://www.reddit.com/r/nosurf/comments/1thg24i/i_asked_my_friends_to_text_me_instead_of_sending/. **Caution:** the post later names a specific screen-time app, a common pattern in stealth marketing. It's fine as research color, but **I did not quote it in the essay.**

**Data**
- Bursztyn et al., NBER Working Paper 31771 (rev. 2024), *When Product Markets Become Collective Traps: The Case of Social Media*. Incentivized experiments with college students on TikTok and Instagram found positive welfare by the standard measure "but negative welfare when accounting for these non-user externalities". "Our findings highlight the existence of product market traps, where large shares of active users prefer each platform not to exist." https://www.nber.org/papers/w31771
- Allcott, Braghieri, Eichmeyer & Gentzkow, *American Economic Review* 2020, *The Welfare Effects of Social Media*. Paying people to deactivate a major social network for four weeks before the 2018 US midterms "increas[ed] offline activities such as watching TV alone and socializing with family and friends," "reduced both factual news knowledge and political polarization," and "increased subjective well-being." https://www.aeaweb.org/articles?id=10.1257/aer.20190658
- Pew (2020-10-15): "About two-thirds of Americans (64%) say social media have a mostly negative effect on the way things are going in the country today," citing misinformation, hate and harassment. https://www.pewresearch.org/short-reads/2020/10/15/64-of-americans-say-social-media-have-a-mostly-negative-effect-on-the-way-things-are-going-in-the-u-s-today/

**Strength:** Good. The first-person accounts are vivid, and two strong economics papers explain *why people stay even when they'd rather not* (the "trap"). Allcott shows a tradeoff: well-being up, news knowledge down. The essay uses only the well-being and friends-and-family findings, which is accurate but selective. Note it if the captain wants full balance.

### 1.5 Nostalgia for forums and early social

**First-person voices**
- *"forums where people were genuinely passionate about niche stuff. no algorithm, no clout chasing! just people who really loved what they loved"*. Top answer to "What do you miss about the old internet before ads and bots took over?" (title from the archive; the question post has since been deleted by its author and now shows as "[deleted by user]", but the answers are still live), r/AskReddit, 2026-06. https://www.reddit.com/r/AskReddit/comments/1tzvxjx/what_do_you_miss_about_the_old_internet_before/oqdsi4r/
- *"It was so easy to make friends, and people were a lot more social and normal. You could easily find someone to have a chinwag with on RuneScape, YouTube or any of the dozens of forums."* "I miss the camaraderie of the old internet," r/nosurf, 280 pts, 2021-09. https://www.reddit.com/r/nosurf/comments/psk37b/i_miss_the_camaraderie_of_the_old_internet/
- *"I grew up in the late 90s on obscure message boards... I really miss the community and authenticity of that world."* Ask HN, 110 pts, 2019. https://news.ycombinator.com/item?id=20941191
- *"I really miss the Usenet days where I could contribute to a bulletin board-style forum on hyper-specific subjects."* Ask HN, 261 pts, 2022. https://news.ycombinator.com/item?id=31681234
- *"It's all influencers..., bots, hate speech, bickering... What happened?"* "Tell HN: I miss the old internet," 391 pts, 2018. https://news.ycombinator.com/item?id=17334552
- Other answers in the same vein: *"Most of the Internet seemed strung together by enthusiastic amateurs who mostly made and ran [insert website here] because it was a thing they actually liked, and not because it was their source of income."* https://www.reddit.com/r/AskReddit/comments/1uxtde2/internet_elders_of_reddit_whats_one_thing_about/oy0a2rs/ and *"being able to go down multiple rabbit holes because I haven't been constrained by algorithms and targeted ads."* https://www.reddit.com/r/AskReddit/comments/1tzvxjx/what_do_you_miss_about_the_old_internet_before/oqe4nm4/

**Counter-voices (worth acknowledging)**
- *"In 20 years somebody will write an article about missing this 'old' internet from 2021."* HN. https://news.ycombinator.com/item?id=27491657 (thread: "I Miss the Old Internet (2019)", 500 pts, https://news.ycombinator.com/item?id=27491537)
- *"everyone has always been pining for this or that... people will always be nostalgic in some sense"*, adding that group chats replaced the old chatrooms. HN. https://news.ycombinator.com/item?id=17334623

**Strength:** Very common and emotionally strong. Several 2026 AskReddit "old internet" threads have 300–945 points and roughly 900–1,400 comments each, for example https://www.reddit.com/r/AskReddit/comments/1uxtde2/internet_elders_of_reddit_whats_one_thing_about/. But there are no surveys here, and some of it is age nostalgia. The essay handles this by naming *what* people miss (known people, small rooms, no clout incentive) and treating those as design choices rather than claiming the past was better.

### 1.6 What people say they want (cross-theme)
- *"human validation measures, algorithms that promote high quality non ai generated content, top comments that are helpful and not abusive or rage Bait"*. r/socialmedia, 2026-05. https://www.reddit.com/r/socialmedia/comments/1tt237k/why_has_no_one_create_a_social_media_platform/
- Wishes repeated across threads: chronological / follow-only feeds; friends-only spaces; labelled or removed bots; no ID requirements; the ability to opt out of targeted ads and erase data; niche forums with real moderators. Small builders keep launching "human-only" or "chronological" networks in response, e.g. r/socialmedia 1ppp9rr and HN 45721134. These are not cited in the essay, which avoids product pitches.

### 1.7 Verification table

All checks were run on 2026-10-13. Reddit was checked through `<permalink>.rss` with a desktop Chrome user agent. 429 responses were retried with backoff (`/tmp/fbr/verify.sh`, discarded with the worktree). **Title** means the live `<title>` matches the cited post. **Text** means a phrase from the quote was found in the live feed content.

| URL (short) | HTTP | Title | Text | Note |
|---|---|---|---|---|
| r/Twitter 1tsurwo | 200 | ✓ | ✓ "identical accounts" | |
| r/nosurf 1sgymaz | 200 | ✓ | ✓ "antagonistic" | |
| r/nosurf 1bni628 | 200 | ✓ | ✓ "no history" | |
| r/socialmedia 1olslqs | 200 | ✓ | ✓ "upvoted by other bots" | |
| r/nosurf um9z9t | 200 | ✓ | ✓ "What should I feel" | |
| r/nosurf 187u02g | 200 | ✓ | ✓ "defending myself" | |
| r/Twitter 15vfwn2 | 200 | ✓ | ✓ "genuine interaction" | |
| r/socialmedia 4qmc8l | 200 | ✓ | ✓ (title quote) | |
| r/socialmedia 1tt237k | 200 | ✓ | ✓ "human validation" | |
| r/privacy 1uxgfy8 | 200 | ✓ | ✓ "detailed profile" | |
| r/privacy 1wy0vil | 200 | ✓ | ✓ (title quote) | |
| r/privacy 113nrsy | 200 | ✓ | ✓ (title quote) | |
| r/privacy 1850tol | 200 | ✓ | ✓ "mattress" | |
| r/nosurf 1ij8gck | 200 | ✓ | ✓ "lost a sense of authenticity" | |
| r/nosurf 1v5lw2m | 200 | ✓ | ✓ "lost touch with everybody" | |
| r/nosurf 1p6u74p | 200 | ✓ | ✓ "group chat" | |
| r/nosurf 1thg24i | 200 | ✓ | ✓ "relay station" | possible stealth promo; not in the essay |
| r/nosurf psk37b | 200 | ✓ | ✓ "RuneScape" | |
| r/nosurf 1m2ch83 | 200 | ✓ | ✓ | found while searching, not quoted |
| r/AskReddit 1tzvxjx/oqdsi4r | 200 | ✓ comment | ✓ "clout chasing" | parent post deleted by its author |
| r/AskReddit 1tzvxjx/oqe4nm4 | 200 | ✓ comment | ✓ "rabbit holes" | parent post deleted by its author |
| r/AskReddit 1uxtde2 (thread) and /oy0a2rs | 200 | ✓ | ✓ "enthusiastic amateurs" | |
| HN 17334552, 17334634, 17334623, 20941191, 31681234, 27491537, 27491657, 46671731, 46672628 | 200 | ✓ | text read through the Algolia items API | |
| Thales 2025 Bad Bot press release, Imperva report page | 200 | ✓ | ✓ "51%", "37%" | |
| Pew 2023 data privacy, Pew 2020 "64%" | 200 | ✓ | ✓ | |
| NBER w31771, AEA aer.20190658, arXiv 2305.16941, Guardian 2026-09-11 | 200 | ✓ | ✓ | |
| PMC8256037 (Rathje), PMC8363141 (Brady), PMC11894805 (Milli), PubMed 37498999 (Guess) | 200 | DOI and title confirmed through Crossref | abstract read through Europe PMC | publisher sites returned 403 from Cloudflare |

**Dropped after the live check:** r/nosurf 1ajrhi3 ("Algorithm-based feeds reward fighting and controversy"; the author deleted the body, so the quote can't be checked live), r/nosurf 1ox18dt ("a quiet, simple space…"; removed by moderators, possibly as promotion), r/nosurf 1rjz6cr (deleted by user). None of these are cited above or in the essay. Also dropped as unverifiable: the Atlantic's 2021 dead-internet article (403).

---

## 2. Essay draft

> Constraints followed: first person, plain voice, about 1,450 words, social media in general (Meta/Facebook is not named or targeted), inline links to the research above, ends with principles rather than a product. The footer agreed earlier goes on the published page: *"Independent essay. Not affiliated with Meta Platforms, Inc."*

### Social media should be social again

I miss an internet that was smaller and slower, where I mostly knew who I was talking to. I don't think that's just nostalgia, and I don't think I'm alone.

I spent some time reading what ordinary people say about social media when they aren't trying to go viral: threads on Reddit, Hacker News and smaller forums. The complaints repeat so often they read like one long letter. Too many bots. Feeds that feed you anger. Apps that know too much about you. Friends you no longer really talk to. Underneath all of it is a wish for the old forums and early networks, where people just said what they thought.

This is my attempt to write down what went wrong and what I think social media should be instead.

#### Who am I talking to?

The first problem is simple. More and more often, I can't tell whether there's a person on the other end.

The numbers back up the feeling. The [2025 Bad Bot Report](https://cpl.thalesgroup.com/about-us/newsroom/2025-imperva-bad-bot-report-ai-internet-traffic) found that automated traffic was 51% of all web traffic in 2024, the first time in a decade bots outnumbered humans. That counts the whole web, not just social posts, but people feel it in their replies. One person on r/Twitter described posting about a contested topic and getting ["inundated with identical accounts saying the exact same inflammatory things"](https://www.reddit.com/r/Twitter/comments/1tsurwo/the_site_is_just_90_bots_at_this_point/), all with generic bios and recent sign-up dates. Someone on r/nosurf wondered whether the wave of hostile replies they get could be real people at all, or ["bots that are designed to fire up engagement."](https://www.reddit.com/r/nosurf/comments/1sgymaz/is_reddit_full_of_antagonistic_bots/) A long-time Reddit user noticed that the juiciest posts in big advice forums often come from [accounts with no history whose author never replies](https://www.reddit.com/r/nosurf/comments/1bni628/has_anyone_else_noticed_most_of_the_bigger/).

I can't prove any one of those accounts was a bot. What I can see is that people have stopped assuming good faith, because they can no longer assume a human. If you have to check the account age before you answer a reply, you're not really in a conversation.

#### Feeds built to make us angry

The second problem is the feed. Most of us no longer see what the people we follow posted, in the order they posted it. We see what a ranking system predicts will keep us scrolling, and anger keeps us scrolling.

Researchers have measured this. A [2021 study of 2.7 million posts](https://pmc.ncbi.nlm.nih.gov/articles/PMC8256037/) found that posts about the political "other side" were shared about twice as often, and each word about the other side raised the odds of a share by 67%. [Another study](https://pmc.ncbi.nlm.nih.gov/articles/PMC8363141/) found that when people get likes for outraged posts, they post more outrage later. A [2025 audit](https://pmc.ncbi.nlm.nih.gov/articles/PMC11894805/) compared an engagement-ranked timeline with a plain chronological one. The ranked feed boosted emotionally charged, hostile content that made users feel worse about people they disagreed with, and users didn't even prefer the political posts the algorithm picked for them.

That matches what people write. One person noticed that the content they tried to hide kept coming back, the stuff most offensive to them, ["as if they want me to stay on the app or website constantly defending myself or just watching out of hate."](https://www.reddit.com/r/nosurf/comments/187u02g/does_anyone_else_feel_like_most_of_the_internet/) Someone else put it more bluntly: scrolling a feed is ["asking for the algorithm to tell you what to think about today."](https://www.reddit.com/r/nosurf/comments/um9z9t/scrolling_through_a_feed_is_asking_for_the/) A third watched engagement farming take over a site that was ["once a hub for genuine interaction"](https://www.reddit.com/r/Twitter/comments/15vfwn2/engagement_farming_is_king_now/) and now feels like "an energy-draining battleground."

A chronological feed is not a cure. In a [large experiment during the 2020 US election](https://pubmed.ncbi.nlm.nih.gov/37498999/), moving people to chronological feeds cut how much they used the apps but didn't measurably change their political views over three months. So the order of posts alone won't fix things. My objection is to the goal. When a feed is built to maximize time spent, the cheapest way to get that time is outrage, and that's what we end up with.

#### The price of being watched

The third problem is privacy. In 2023, [Pew found](https://www.pewresearch.org/internet/2023/10/18/how-americans-view-data-privacy/) that 67% of Americans say they understand little or nothing about what companies do with their personal data, up from 59% a few years earlier. One Reddit user searched their own username and found an AI summary that had worked out their state, their cars, their university and the forums they moderate, ["inferred by connecting thousands of comments"](https://www.reddit.com/r/privacy/comments/1uxgfy8/i_deleted_over_5000_comments_and_200_posts_from/) written over seven years. They deleted more than 5,000 of them. A Hacker News commenter remembered when online friends knew only each other's handles, and said that now ["we just craft our posts carefully hoping it's not used against you in the future."](https://news.ycombinator.com/item?id=17334634)

That last line worries me most. When everything you write becomes a permanent, searchable and sellable record, you start writing less of what you actually think. Surveillance costs people their honesty along with their privacy.

There's a trap here too. The obvious fix for bots is to make everyone prove who they are, and governments are now proposing it, up to [passport checks for social media accounts](https://www.reddit.com/r/privacy/comments/1wy0vil/uk_government_to_require_everyone_to_use_a/). I don't want to swap a web full of bots for one where every post is tied to a government ID. Good social media has to deal with both problems at once.

#### We stopped talking to each other

The fourth problem is the one that makes me saddest. Social media was supposed to be about people we know. More and more, it's a stream of content we pass between us.

One person wrote that their friends ["engage in social activities only so that they can make a reel or post out of it,"](https://www.reddit.com/r/nosurf/comments/1ij8gck/socialising_with_friends_when_you_are_not_on/) and added: "I loathe how human interaction has lost a sense of authenticity." Another person deleted their accounts and found they had [stopped existing to their friends](https://www.reddit.com/r/nosurf/comments/1p6u74p/deleted_social_media_and_apparently_stopped/), because every invitation now went out through a story or an event page.

That second story explains why leaving is hard even when we want to. Economists ran [incentivized experiments](https://www.nber.org/papers/w31771) with college students and found what they call a "product market trap": large shares of active users would prefer that the platforms they use didn't exist, yet stay because everyone else is there. In [an earlier experiment](https://www.aeaweb.org/articles?id=10.1257/aer.20190658), people were paid to deactivate a major social network for four weeks. They spent more time with friends and family, and they reported being happier.

#### What we actually miss

Ask people what they miss about the older internet and the answers are specific. ["Forums where people were genuinely passionate about niche stuff. no algorithm, no clout chasing!"](https://www.reddit.com/r/AskReddit/comments/1tzvxjx/what_do_you_miss_about_the_old_internet_before/oqdsi4r/) Someone else missed the [camaraderie](https://www.reddit.com/r/nosurf/comments/psk37b/i_miss_the_camaraderie_of_the_old_internet/): "It was so easy to make friends." One Hacker News poster grew up on ["obscure message boards"](https://news.ycombinator.com/item?id=20941191) and misses "the community and authenticity of that world." Another asked whether anything like Usenet still exists, a place to talk about ["hyper-specific subjects."](https://news.ycombinator.com/item?id=31681234)

I know some of this is rose-tinted. Old forums had trolls, flame wars and petty moderators, and as one commenter pointed out, [in 20 years someone will miss today's internet](https://news.ycombinator.com/item?id=27491657). Still, the things people miss are consistent: knowing who you're talking to, spaces small enough to have their own norms, and conversations that weren't shaped by someone else's revenue target. Those came from design choices, and we can make those choices again.

#### What better social media looks like

These are the principles I'd judge any social platform by. They describe what I want to use, not a product I'm selling.

1. **People first, bots labeled.** Automated accounts are allowed only if they say so. A platform should be able to tell that an account is run by a real person without collecting that person's government ID.
2. **You choose your feed.** By default you see the people and communities you picked, in the order they posted. Any ranking is optional, explained and easy to turn off. At least one government is [already moving toward requiring an opt-out](https://www.theguardian.com/media/2026/sep/11/i-turned-off-my-instagram-algorithm-opt-out-social-media-reforms-australia).
3. **No rewards for rage.** Reach isn't earned through outrage. Nobody is paid by the reaction, and nothing is ranked by how much heat it generates.
4. **Your data stays yours.** Collect only what the service needs to run. Don't sell it, don't train on it without asking, and let people delete it for real.
5. **Small rooms.** Groups sized for real conversation, with their own norms and moderators who belong to the community.
6. **Conversation over content.** Writing a thought or a reply should be easier than forwarding a clip. Success means people talked, not how long they stared at a screen.
7. **Leaving is easy.** Your contacts and posts can come with you, so nobody stays only because everyone else is stuck too.

None of this is new. Much of it is how the forums people miss already worked. What's different now is that we've seen what the alternative costs. I'd like social media to be a place for real thoughts from real people again, and from what I've read, I'm far from the only one.

---

## 3. Open questions for the captain

Answer any of these, or just edit the draft directly. My recommendation is marked ★.

1. **Title.**
   - ★ "Social media should be social again". Plain and states the thesis.
   - "Real people, real thoughts". Shorter, but softer.
   - "What I want from social media". The most personal option, and the least shareable.
2. **How personal should the opening be?** Right now the first person is generic ("I miss an internet that was smaller...").
   - ★ Add one or two true lines from your own experience, such as a forum or early network you used, or a moment you noticed the change. Only you can write these, and they will do more than any statistic.
   - Keep it as it is.
3. **Tone.**
   - ★ Measured, as drafted. Every claim is linked, there are counterpoints, and no one is called a villain. This holds up better under scrutiny and keeps it clear the page is commentary and not an attack.
   - Sharper and angrier. More shareable, but easier to dismiss.
4. **Call to action at the end.**
   - ★ None beyond the principles. That fits "non-commercial commentary" and avoids looking like a pitch.
   - A soft invitation: "If you agree, tell me what you'd add" (needs a contact method, such as an email address or a GitHub issue).
   - Point people to existing alternatives (forums, the fediverse, group chats). This risks reading like an endorsement.
5. **Quoting strangers.** The draft quotes Reddit and HN users by link only, without usernames.
   - ★ Keep it that way. Linking without naming respects the privacy argument the essay makes. Re-check that every link still works on publish day.
   - Paraphrase everything and link only to studies. Safer if posts get deleted, but it loses the human voice that carries the piece.
6. **Length and the principles list.**
   - ★ Keep all seven principles but cut the essay body to about 1,200 words if you add personal lines (the bots and privacy sections have the most room to trim).
   - Cut to five principles. Merging "small rooms" with "conversation over content" and "no rewards for rage" with "you choose your feed" works.

---

## 4. Recommendation and next step

- No build work should ship yet, per the captain. The next step is the captain's edit pass on §2 and answers to §3.
- After the captain signs off, publishing on facebook.build is a small follow-up: one static page with the essay, links and the agreed footer, with no Meta logos or look-alike styling. Firstmate can promote that in place when the captain is ready.
- Before publishing, re-check the Reddit links. Posts get deleted, and two of the strongest quotes are from 2025–2026 threads.
