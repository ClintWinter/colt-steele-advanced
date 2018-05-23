# Flexbox

A more efficient way to lay out, align, and distribute space among items in a container.

* [The Best Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)

2 types of properties:

| Container Properties | Flex Item Properties |
| --- | --- |
| `flex-direction` | `order` |
| `justify-content` | `flex` |
| `flex-wrap` | `flex-grow` |
| `align-items` | `flex-shrink` |
| `align-content` | `align-self` |

## display: flex

This initializes the use of flexbox. This property is applied to the container, not the elements inside that are being arranged.

``` css
.container {
    display: flex;
}
```

## Terminology

* **Flex Container** - Refers to the element that has the `display: flex` property. Holds all of the flex items inside of it.
* **Flex Item** - The individual elements inside of a flex container. Behave differently than normal elements when `display: flex` and other flex container properties are applied to the flex container.
* **Main Axis** - By default goes laterally, left to right. However, the main axis can go right to left by reversing order, or top to bottom if the flex container is made to use a column format.
* **Cross Axis** - By default goes longitudinally, top to bottom. Same as the **main axis**, it's direction is based on the properties of the flex container.

## Flex-direction

Specifies how items are placed in the flex container, defining the *main axis* and its *direction*. By default, this property is set to `row`. In the `1_display-flex` example, the items are arranged in the default row format.

### Example

``` css
.container {
    display: flex;
    flex-direction: row;
    /* Main Axis = left to right */
}

.container2 {
    display: flex;
    flex-direction: row-reverse;
    /* Main Axis = right to left */
}

.container3 {
    display: flex;
    flex-direction: column;
    /* Main Axis = top to bottom */
}

.container3 {
    display: flex;
    flex-direction: column-reverse;
    /* Main Axis = bottom to top */
}
```

Go to `2_flex-direction` to see how each of these property values affects the flex items.

## Flex-wrap

Specifies whether items are forced into a single line OR can be *wrapped into multiple lines*.

### Example

``` css
.container {
    flex-wrap: nowrap;
}

.container2 {
    flex-wrap: wrap;
}

.container3 {
    flex-wrap: wrap-reverse;
}
```

If you go to the example folder `3_flex-wrap`, you'll notice that the flex container that doesn't wrap actually **_overrides_** the width of the flex items to make them fit in the box. We set the width to `300px` to make the items wrap, and with the `nowrap` container, the flex items are clearly less than `300px` to be made to fit inside the container.

`wrap-reverse` changes the **cross axis** from top to bottom (when it wraps, the next row goes underneath) to bottom to top, so that the next row actually goes *above* the first row.

Combining `flex-wrap` and `flex-direction` gives you a ton of flexibility in the order and layout of your flex items.

## Justify-content

Defines how space is distributed between flex items in the flex container (*along the main axis*).

### Example

``` css
.container {
    justify-content: flex-start;
    /* This is the default setting of justify-content. All of the items start at the beginning of the main axis direction. 
    White space will be after the flex items. */
}

.container2 {
    justify-content: flex-end;
    /* The opposite of flex-start. All items are at the end of the main axis, and whitespace is in the front. 
    DOES NOT change the order. */
}

.container3 {
    justify-content: center;
    /* Self-explanatory. Flex items are centered on the main axis, white space is evenly distributed to the left and right of all flex items.
    No white space between flex items. */
}

.container4 {
    justify-content: space-between;
    /* Spaces the flex items out to entire width of the main axis. All white space is evenly distributed between flex items. */
}

.container5 {
    justify-content: space-around;
    /* Similar to space-between, but white space is also distributed to the ends of the container as well. The space is AROUND
    each flex item. */
}
```

## Align-items

Defines how space is distributed between items in flex container (*Along the cross axis*). More like between the borders of the container the cross axis faces. So if the cross axis goes top to bottom, the `align-items` property determines how each flex item sits between those two lines.

### Example

``` css
.container {
    align-items: flex-start;
    /* Each item sits at the top of the flex container (assuming left to right main axis and top to bottom cross axis) */
}

.container2 {
    align-items: flex-end;
    /* Each item sits at the bottom of the flex container (assuming left to right main axis and top to bottom cross axis) */
}

.container3 {
    align-items: stretch; /* DEFAULT */
    /* Each item stretches across the top axis, so, in our assumed case, from the top down to the bottom. */
}

.container4 {
    align-items: center;
    /* Each item is centered on the cross axis. */
}

.container5 {
    align-items: baseline;
    /* Each item is centered by the text in the flex item. */
}
```

`align-items` defaults to stretch.

## Align-content

Defines how space is distributed **between rows** in flex container *along the cross axis*.

This one is confusing to understand, but the best way to grasp it is to know that `align-items` is referring how the the flex items are aligned on the cross axis in relation to each other, whereas `align-content` is how the *rows* of flex items are spaced on the cross axis. It works like `justify-content` but instead of with flex items, it's rows.

### Example

``` css
.container {
    align-content: flex-start;
}

.container2 {
    align-content: flex-end;
}

.container3 {
    align-content: space-between;
}

.container4 {
    align-content: space-around;
}

.container5 {
    align-content: center;
}

.container5 {
    align-content: stretch;
}
```

This resolves all of the available flex container properties. Next we will learn properties that apply to the flex items themselves.

## Align-self

Allows you to override align-items on individual flex items. So you may have `align-items` set to `flex-start` and all of the flex items are at the top of the container. Then on a specific flex item you set its `align-self` property to `flex-end`, putting it at the bottom of the container, opposite its siblings.

### Example

``` css
.container {
    align-items: flex-start;
}

.box-2 {
    align-self: flex-end;
}
```

``` css
.container {
    align-items: center;
}

.box-2, .box-3 {
    align-self: flex-start;
}
```

## Order

Specifies the order used to lay out items in their flex container. We can write them one way in the HTML, then, using this property in the css, reorder them.

### Example

By default, all flex items have an order of `0`. That means if we do this:

``` css
.box-1 {
    order: 2;
}
```

We aren't changing the first box and moving it to the second position; we are putting it and the end because 2 is greater than all the other flex items with a value of 0.

``` css
.box-3 {
    order: -1;
}
```

Box 3 goes to the beginning because it's a lower value than the other flex items at value 0.

## Flex-basis

So far, all of our items have been equally sized. But what if we want a layout with a sidebar on each side and a main, larger section in the middle?

There's a property called `flex`, which defines how a flex item will grow or shrink to fit the available space in a container. This property is a *shorthand* property for 3 other properties. Those properties are:
* `flex-grow`
* `flex-shrink`
* `flex-basis`

Sort of like width, but not. Specifies the ideal size of a flex item BEFORE it's placed into a flex container.

`flex-basis` also overrides width/height (depending on if direction is row or column).

### Example

``` css
.box-1 {
    flex-basis: 100px;
}

.container > div {
    flex-basis: 150px;
}
```

When we set `flex-basis` to a high number that doesn't fit all the items, they shrink down equally to fit in the container just like they normally would inside a flex container. 

## Flex-grow

Dictates how the unused space should be spread amongst flex items. *It's all about ratios!*

### Example

To make all boxes share space evenly:

``` css
.box {
    flex-grow: 1;
}
```

The number can be anything as long as it's the same number.

3 boxes, to make box 2 take up 2 times the extra space as the others, do this:

``` css
.box {
    flex-grow: 1;
}

.box-2 {
    flex-grow: 2;
}
```

It doesn't mean make box 2 twice as large, it means make box 2 take up twice as much of the available space as box 1 and box 3. We could write the same thing like this:

``` css
.box {
    flex-grow: 9;
}

.box-2 {
    flex-grow: 18;
}
```

*It's all about the ratios!*

Let's say container = 1000px. We have 2 boxes, each 100px. That means 800px of leftover space. If `flex-grow` is not set, those 2 boxes will be 100px and not fill up the container.

If we set both boxes to `flex-grow: 1;`, they evenly share the free space. Both boxes gain 400px of the 800px, making them 500px in width each.

If we set box 1 to `flex-grow: 1'` and box 2 to `flex-grow: 4;`, we have split up the free space into 5 total chunks. 1 allocated to box 1 and 4 allocated to box 2. It isn't how you may think, which is 1/4 to box 1 and 3/4 to box 2. Box 1 gets 1/5 of 800px, which is 160px. Box 2 gets 4/5 of 800px, which is 640px. This puts box 1 at 260px and box 2 at 740px.

`flex-grow`'s default value is 0. Therefor, if we set only the first box's `flex-grow` property to `1`, it takes ALL of the free space.

## Flex-shrink

Dictates how items should shrink when there isn't enough space in container. `flex-grow` handled how to deal with extra space, now `flex-shrink` will handle how we deal with not enough of it! Keep in mind `flex-shrink` uses a different formula than `flex-grow` to determine space allocation.

`flex-shrink` by default is 1 because when there isn't enough space, all of the flex items shrink evenly.

The higher the value, the *faster* it shrinks. A bigger `flex-shink` value increase its amount of shrinkage.

If we have 3 boxes again, and set their `flex-basis: 350px` and their `flex-grow: 1` and box 1 and 3's `flex-shrink: 2`. That means they have evenly expanded to fill the container. When we make the container more narrow, they will shrink evenly until they hit the 350px `flex-basis`. Then 2 will shrink less than 1 and 3, but still shrink. If we don't want it to shrink, we set 2's `flex-shrink` to 0.

Just look at **folder 13** for examples of its use.

## Flex (Shorthand)

`flex` is shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`. Order matters. The order is `flex: <flex-grow> <flex-shrink> <flex-basis>`.

## Browser Support

[caniuse](https://caniuse.com/#search=flex) shows you which browsers are supported.

[autoprefixer](http://autoprefixer.github.io/) to put your css code in and get back the prefixed code to support all browsers.