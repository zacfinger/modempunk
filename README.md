## Modempunk ##

An automated art blog using the Tumblr API. (C) 2014 - Present.

### Premise ###
[![IMAGE ALT TEXT HERE](https://i.ytimg.com/vi/lGno3ElyXCc/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCEZcc9CvfSEvyBBsi2NQaH1C0MTw)](https://youtu.be/lGno3ElyXCc)

The bot uses the Tumblr API to query posts that:
* Match a tag provided as a command line argument by the user
* Have occurred within a timeframe less than X amount of seconds specified as a command line argument by the user.

The bot will take each post and publish them to the blog whose credentials are specified in the user-provided config.js file, appending a random sentence from the file neuromancer.js, which at present contains the full text of _Burning Chrome_ and _Neuromancer_ by William Gibson, and _Snow Crash_ by Neal Stephenson as a string parameter.

For a live demo, see modempunk.com which pairs these texts against Tumblr posts with tags such as ```vaporwave``` and ```glitch art```, which generates oddly compelling image pairings.

### Usage ###

The following command will query all Tumblr posts made within the last 1800 seconds that are associated with the tag ```vaporwave```:
```
node main.js 'vaporwave' 1800
```

### Configuration ###

Your ```config.js``` file contains the Tumblr-provided credentials for your Tumblr blog. See Tumblr's API documentation for the appropriate values. It must be formed like this:

```javascript
module.exports = { 
  consumer_key: // your consumer key as string
  consumer_secret: // your consumer secret as string
  token: // your token as string,
  token_secret: // your token secret as string
}
```

Your file ```neuromancer.js``` can contain any multisentence string, but must be arranged as follows:

```javascript
module.exports = "That summer Parker had trouble sleeping. There were power droughts; sudden failures of the delta-inducer brought painfully abrupt returns to consciousness...
```