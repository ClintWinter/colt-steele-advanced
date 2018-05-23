# Keyframes

Transitions allow us to animate a *single-state change* (color red to color blue or left 0px to left 100px), whereas **keyframes** allow for more complex *multi-state animations*.

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)

With transitions we can have a circle go from state A to state B, like red to orange. With keyframes we can have that circle go from state A to state B to state C to state D ... to state Z.

## Keyframe Syntax

**Step 1: Define**

You must define the animation itself by using `@keyframes` and naming it. In this case it's name is "rainbowtext".

``` css
@keyframes rainbowtext {
    0% {
        color: red;
        font-size: 20px;
    }
    25% {
        color: orange;
    }
    50% {
        color: yellow;
        font-size: 40px;
    }
    75% {
        color: green;
    }
    100% {
        color: blue;
        font-size: 20px;
    }
}
```

But nothing will happen until we do step 2.

**Step 2: Apply**

``` css
p {
    animation-name: rainbowtext;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
}
```

Some of these properties should look familiar to you because they were also used for transitions (just with the `transition-` prefix instead of `animation-`).

All the usual suspects are here:
* `animation-name`
* `animation-duration`
* `animation-timing-function`
* `animation-delay`

Let's look at some of the other "newer" animation properties:
* `animation-iteration-count`
* `animation-fill-mode`
* `animation-direction`
* `animation-play-rate`

## animation-iteration-count

How many times an animation should repeat.

`animation-iteration-count: 1;`, `animation-iteration-count: 7;`, `animation-iteration-count: infinite;`

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count)

## animation-direction

The `animation-direction` CSS property specifies whether an animation should play forwards, backwards, or alternating back and forth.

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction)

`animation-direction: forward;`, `animation-direction: reverse;`, `animation-direction: alternate;`

## animation-fill-mode

Specifies how an animation should apply styles before and after the animation.

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode)

`animation-fill-mode: forwards;`, `animation-fill-mode: backwards;`, `animation-fill-mode: both;`, `animation-fill-mode: none;`

## animation-play-state

Specifies whether the animation is running or paused.

`animation-play-state: paused;`, `animation-play-state: running;`

## Animation Shorthand

`animation: 3s ease-in 1s 2 reverse both paused slidein;`, `animation: changecolor 3s linear 1s infinite;`, `animation: jiggle 4s`

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

The example is honestly pretty hard to read, sometimes it's better for clarity's sake to keep them separated.

``` css
div {
    /* duration, timing-function, delay, iteration-count, direction, fill-mode, play-state, name */
    animation: 3s ease-in 1s 2 reverse both paused slidein;
}
```