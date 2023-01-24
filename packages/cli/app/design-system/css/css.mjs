import { createCss, createMergeCss, withoutSpace } from '../helpers.mjs';
import { sortConditions, finalizeConditions } from './conditions.mjs';

const classNameMap = {
  "aspectRatio": "aspect",
  "boxDecorationBreak": "box-decoration",
  "zIndex": "z",
  "boxSizing": "box",
  "objectPosition": "object",
  "objectFit": "object",
  "overscrollBehavior": "overscroll",
  "overscrollBehaviorX": "overscroll-x",
  "overscrollBehaviorY": "overscroll-y",
  "position": "pos",
  "top": "t",
  "left": "l",
  "insetInline": "inset-x",
  "insetBlock": "inset-y",
  "inset": "inset",
  "insetBlockEnd": "inset-b",
  "insetBlockStart": "inset-t",
  "insetInlineEnd": "end",
  "insetInlineStart": "start",
  "start": "s",
  "right": "r",
  "end": "e",
  "bottom": "b",
  "insetX": "inset-x",
  "insetY": "inset-y",
  "float": "float",
  "visibility": "vis",
  "display": "d",
  "hideFrom": "hide",
  "hideBelow": "show",
  "flexBasis": "basis",
  "flex": "flex",
  "flexDirection": "flex",
  "flexGrow": "grow",
  "flexShrink": "shrink",
  "gridTemplateColumns": "grid-cols",
  "gridTemplateRows": "grid-cols",
  "gridColumn": "col-span",
  "gridRow": "row-span",
  "gridColumnStart": "col-start",
  "gridColumnEnd": "col-end",
  "gridAutoFlow": "grid-flow",
  "gridAutoColumns": "auto-cols",
  "gridAutoRows": "auto-rows",
  "gap": "gap",
  "gridGap": "gap",
  "gridRowGap": "gap-x",
  "gridColumnGap": "gap-y",
  "rowGap": "gap-x",
  "columnGap": "gap-y",
  "justifyContent": "justify",
  "alignContent": "content",
  "alignItems": "items",
  "alignSelf": "self",
  "padding": "p",
  "paddingLeft": "pl",
  "paddingRight": "pr",
  "paddingTop": "pt",
  "paddingBottom": "pb",
  "paddingBlock": "py",
  "paddingBlockEnd": "pb",
  "paddingBlockStart": "pt",
  "paddingInline": "px",
  "paddingInlineEnd": "pe",
  "paddingInlineStart": "ps",
  "paddingX": "px",
  "paddingY": "py",
  "marginLeft": "ml",
  "marginRight": "mr",
  "marginTop": "mt",
  "marginBottom": "mb",
  "margin": "m",
  "marginX": "mx",
  "marginY": "my",
  "marginBlock": "my",
  "marginBlockEnd": "mb",
  "marginBlockStart": "mt",
  "marginInline": "mx",
  "marginInlineEnd": "me",
  "marginInlineStart": "ms",
  "spaceX": "space-x",
  "spaceY": "space-y",
  "width": "w",
  "height": "h",
  "minHeight": "min-h",
  "maxHeight": "max-h",
  "minWidth": "min-w",
  "maxWidth": "max-w",
  "color": "text",
  "fontFamily": "font",
  "fontSize": "fs",
  "fontWeight": "font",
  "fontSmoothing": "smoothing",
  "fontVariantNumeric": "numeric",
  "letterSpacing": "tracking",
  "lineHeight": "leading",
  "textAlign": "text",
  "textDecoration": "decor",
  "textDecorationColor": "decoration",
  "textEmphasisColor": "emphasis",
  "textDecorationStyle": "decoration",
  "textDecorationThickness": "decoration",
  "textUnderlineOffset": "underline-offset",
  "textTransform": "text",
  "textIndent": "indent",
  "textShadow": "text-shadow",
  "textOverflow": "text",
  "verticalAlign": "align",
  "wordBreak": "break",
  "truncate": "truncate",
  "lineClamp": "clamp",
  "listStyleType": "list",
  "listStylePosition": "list",
  "backgroundAttachment": "bg",
  "backgroundClip": "bg-clip",
  "background": "bg",
  "backgroundColor": "bg",
  "backgroundPosition": "bg",
  "backgroundOrigin": "bg-origin",
  "backgroundImage": "bg-img",
  "backgroundRepeat": "bg-repeat",
  "backgroundBlendMode": "bg-blend",
  "backgroundSize": "bg",
  "backgroundGradient": "bg-gradient",
  "textGradient": "text-gradient",
  "gradientFrom": "from",
  "gradientTo": "to",
  "gradientVia": "via",
  "borderRadius": "rounded",
  "borderTopLeftRadius": "rounded-tl",
  "borderTopRightRadius": "rounded-tr",
  "borderBottomRightRadius": "rounded-br",
  "borderBottomLeftRadius": "rounded-bl",
  "borderTopRadius": "rounded-t",
  "borderRightRadius": "rounded-r",
  "borderBottomRadius": "rounded-b",
  "borderLeftRadius": "rounded-l",
  "borderStartStartRadius": "rounded-ss",
  "borderStartEndRadius": "rounded-se",
  "borderStartRadius": "rounded-s",
  "borderEndStartRadius": "rounded-es",
  "borderEndEndRadius": "rounded-ee",
  "borderEndRadius": "rounded-e",
  "border": "border",
  "borderInline": "border-x",
  "borderBlock": "border-y",
  "borderColor": "border",
  "borderInlineColor": "border-x",
  "borderBlockColor": "border-y",
  "borderLeft": "border-l",
  "borderLeftColor": "border-l",
  "borderInlineStart": "border-is",
  "borderInlineStartColor": "border-s",
  "borderRight": "border-r",
  "borderRightColor": "border-r",
  "borderInlineEnd": "border-ie",
  "borderInlineEndColor": "border-e",
  "borderTop": "border-t",
  "borderTopColor": "border-t",
  "borderBottom": "border-b",
  "borderBottomColor": "border-b",
  "borderX": "border-x",
  "borderY": "border-y",
  "borderStyle": "border",
  "outlineWidth": "ring",
  "outlineColor": "ring",
  "outline": "ring",
  "outlineOffset": "ring",
  "divideX": "divide-x",
  "divideY": "divide-y",
  "divideColor": "divide",
  "divideStyle": "divide",
  "boxShadow": "shadow",
  "boxShadowColor": "shadow",
  "mixBlendMode": "mix-blend",
  "filter": "filter",
  "brightness": "brightness",
  "contrast": "contrast",
  "grayscale": "grayscale",
  "hueRotate": "hue-rotate",
  "invert": "invert",
  "saturate": "saturate",
  "sepia": "sepia",
  "dropShadow": "drop-shadow",
  "blur": "blur",
  "backdropFilter": "backdrop",
  "backdropBlur": "backdrop-blur",
  "backdropBrightness": "backdrop-brightness",
  "backdropContrast": "backdrop-contrast",
  "backdropGrayscale": "backdrop-grayscale",
  "backdropHueRotate": "backdrop-hue-rotate",
  "backdropInvert": "backdrop-invert",
  "backdropOpacity": "backdrop-opacity",
  "backdropSaturate": "backdrop-saturate",
  "backdropSepia": "backdrop-sepia",
  "borderCollapse": "border",
  "borderSpacing": "border-spacing",
  "borderSpacingX": "border-spacing-x",
  "borderSpacingY": "border-spacing-y",
  "tableLayout": "table",
  "transitionTimingFunction": "ease",
  "transitionDelay": "delay",
  "transitionDuration": "duration",
  "transitionProperty": "transition",
  "animation": "animation",
  "transform": "transform",
  "transformOrigin": "origin",
  "scale": "scale",
  "scaleX": "scale-x",
  "scaleY": "scale-y",
  "rotate": "rotate",
  "translateX": "translate-x",
  "translateY": "translate-y",
  "skewX": "skew-x",
  "skewY": "skew-y",
  "accentColor": "accent",
  "caretColor": "caret",
  "scrollBehavior": "scroll",
  "scrollbar": "scrollbar",
  "scrollMargin": "scroll-m",
  "scrollMarginX": "scroll-mx",
  "scrollMarginY": "scroll-my",
  "scrollMarginLeft": "scroll-ml",
  "scrollMarginRight": "scroll-mr",
  "scrollMarginTop": "scroll-mt",
  "scrollMarginBottom": "scroll-mb",
  "scrollMarginBlock": "scroll-my",
  "scrollMarginBlockEnd": "scroll-mb",
  "scrollMarginBlockStart": "scroll-mt",
  "scrollMarginInline": "scroll-mx",
  "scrollMarginInlineEnd": "scroll-me",
  "scrollMarginInlineStart": "scroll-ms",
  "scrollPadding": "scroll-p",
  "scrollPaddingBlock": "scroll-pb",
  "scrollPaddingBlockStart": "scroll-pt",
  "scrollPaddingBlockEnd": "scroll-pb",
  "scrollPaddingInline": "scroll-px",
  "scrollPaddingInlineEnd": "scroll-pe",
  "scrollPaddingInlineStart": "scroll-ps",
  "scrollPaddingX": "scroll-px",
  "scrollPaddingY": "scroll-py",
  "scrollPaddingLeft": "scroll-pl",
  "scrollPaddingRight": "scroll-pr",
  "scrollPaddingTop": "scroll-pt",
  "scrollPaddingBottom": "scroll-pb",
  "scrollSnapAlign": "snap",
  "scrollSnapStop": "snap",
  "scrollSnapType": "snap",
  "scrollSnapStrictness": "strictness",
  "scrollSnapMargin": "snap-m",
  "scrollSnapMarginTop": "snap-mt",
  "scrollSnapMarginBottom": "snap-mb",
  "scrollSnapMarginLeft": "snap-ml",
  "scrollSnapMarginRight": "snap-mr",
  "touchAction": "touch",
  "userSelect": "select",
  "fill": "fill",
  "stroke": "stroke",
  "srOnly": "sr",
  "debug": "debug",
  "borderSlim": "border-slim",
  "textStyle": "textStyle"
}

const shorthands = {
  "pos": "position",
  "insetEnd": "insetInlineEnd",
  "insetStart": "insetInlineStart",
  "flexDir": "flexDirection",
  "p": "padding",
  "pl": "paddingLeft",
  "pr": "paddingRight",
  "pt": "paddingTop",
  "pb": "paddingBottom",
  "pe": "paddingInlineEnd",
  "ps": "paddingInlineStart",
  "px": "paddingX",
  "py": "paddingY",
  "ml": "marginLeft",
  "mr": "marginRight",
  "mt": "marginTop",
  "mb": "marginBottom",
  "m": "margin",
  "mx": "marginX",
  "my": "marginY",
  "me": "marginInlineEnd",
  "ms": "marginInlineStart",
  "w": "width",
  "h": "height",
  "minH": "minHeight",
  "maxH": "maxHeight",
  "minW": "minWidth",
  "maxW": "maxWidth",
  "bgAttachment": "backgroundAttachment",
  "bgClip": "backgroundClip",
  "bg": "background",
  "bgColor": "backgroundColor",
  "bgPos": "backgroundPosition",
  "bgOrigin": "backgroundOrigin",
  "bgImage": "backgroundImage",
  "bgRepeat": "backgroundRepeat",
  "bgBlend": "backgroundBlendMode",
  "bgSize": "backgroundSize",
  "bgGradient": "backgroundGradient",
  "borderXColor": "borderInlineColor",
  "borderYColor": "borderBlockColor",
  "ringWidth": "outlineWidth",
  "ringColor": "outlineColor",
  "ring": "outline",
  "ringOffset": "outlineOffset",
  "shadow": "boxShadow",
  "shadowColor": "boxShadowColor",
  "x": "translateX",
  "y": "translateY"
}

const breakpointKeys = ["base","sm","md","lg","xl","2xl"]

const hasShorthand = true

const resolveShorthand = (prop) => shorthands[prop] || prop

function transform(prop, value) {
  const key = resolveShorthand(prop)
  const propKey = classNameMap[key] || prop
  const className = `${propKey}_${withoutSpace(value)}`
  return { className }
}

const context = {
  hash: false,
  conditions: {
    shift: sortConditions,
    finalize: finalizeConditions,
    breakpoints: { keys: breakpointKeys }
  },
  utility: {
    transform,
    hasShorthand,
    resolveShorthand,
  }
}

export const css = createCss(context)

export const { mergeCss, assignCss } = createMergeCss(context)