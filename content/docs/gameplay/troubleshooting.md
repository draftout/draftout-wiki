---
icon: CircleHelp
title: Troubleshooting
description: Resolve common launch, server connection and in-game problems.
---

## Problems with launching or game crashing

If the game randomly crashed mid-match, you most likely do not have the JVM arguments (Java 25 has a rare bug). Check the [installation requirements](/wiki/gameplay/getting-started#install-draftout) then add the recommended JVM arguments to your instance's Java settings:

```text
-XX:StackShadowPages=32 -XX:CompileCommand=exclude,io/netty/util/internal/ReferenceCountUpdater,retryRelease0
```

The [installation guide](https://draftoutmc.com/download) shows how to add those arguments.

If it still crashes:
- Make sure you're on the latest version of Draftout,
- Check for duplicate/outdated/disallowed mods,
- Ask for help in Discord.
    - Make sure to include your crash report (or `latest.log`) when asking for help, as well as your Draftout and Java versions, what launcher you're using and what you were doing when the game crashed.

## Disconnected from server

Try to reconnect as soon as possible. Draftout gives you 5 minutes to return before you automatically forfeit. Do not restart your game (unless you have to) as it will reset all world progress.

Check [#updates-maintenances](https://discord.com/channels/1493030345048719483/1495253878751363252) if the server appears to be down.

If reconnecting still fails: open a bug report with the error, username (and exact match link or id) and when it happened.

## The F3 entity count shows -1

Turn off **Entity Culling** in Video Settings if the entity count shows `-1` or the pie chart is missing `blockEntities`. This setting can prevent the information from appearing.

## A replay does not open

Confirm that the replay has not expired.
Replays are stored on the server for 3 days. Downloaded copies of replays can be opened from the **Replays** screen.

See [Replays](/wiki/gameplay/replays) for more information.

## Get help or report a bug

For installation help and other questions, ask in [#public-help](https://discord.com/channels/1493030345048719483/1495250366873206965) in Discord.

For bugs, post in [#bug-reports](https://discord.com/channels/1493030345048719483/1506411992620072960) with the steps to reproduce the bug, username (and match link/id), screenshot or short clip of the bug (if it helps show the problem).
