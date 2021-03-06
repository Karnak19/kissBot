# Kiss Bot

## Pre-requisite

`node 11.10`  
`npm 6.9`

## Getting Started

`git clone`  
`npm install`  
`npm run dev`: Start local development server using `nodemon`.

## Environment variables

`TOKEN` = is the bot token
`botUsername` = the Name of you Discord Bot
`GOOGLE_CLIENT_EMAIL` = email Credentials for Google API
`GOOGLE_PRIVATE_KEY` = key Credentials for Google API
You can see an example file as `.example.env`

## Commands

### Events :`!event`

```
[raid] : required
ss    :           Sunspire
cr    :           Cloudrest
as    :           Asylum Sanctorium
hof   :           Halls of Fabrication
mol   :           Maw of Lorkhaj
hrc   :           Hel Ra Citadel
so    :           Sanctum Ophidia
aa    :           Aetherian Archive
```

```
[date] : required
DD/MM/YYYY
```

```
[hour] : required
(24-hour clock)
HH:MM
```

```
[raid type] : optional
hm
progress
vitalité
score
```

```
[event type] : optional
ouvert : open
selectif : roster only
```

**Examples :**
Respect the argument's order
`!event create ss 27/05/2019 21:00`
`!event create ss 27/05/2019 21:00 hm selectif`

### Rand : `!rand`

#### !rand :

Return a random number between 1 - 100

#### !rand create [arg]:

Open a !rand instance, if you want to limit the number of participation for a specific item for example
![https://puu.sh/DMNXi/39f33aacd7.png](https://puu.sh/DMNXi/39f33aacd7.png)

### Team : `!team`

```
[raid] : required
ss    :           Sunspire
cr    :           Cloudrest
as    :           Asylum Sanctorium
hof   :           Halls of Fabrication
mol   :           Maw of Lorkhaj
hrc   :           Hel Ra Citadel
so    :           Sanctum Ophidia
aa    :           Aetherian Archive
```
