import { DOMNodeBoxFragment } from "./../types/dom-node-box";
import Fragment from "./fragment";
import createDOMNodeBOX from "./create-dom-node-box";

function MakeAmount(fn: Function, amount: number) {
  console.time("@createDOMNodeBOX");

  const values = [];
  let count = amount;

  while (count--) {
    values.unshift(fn());
  }
  console.timeEnd("@createDOMNodeBOX");

  return values;
}

export function _custom(tag: string) {
  return createDOMNodeBOX<HTMLElement>(tag);
}

export function _fragment(...args: any[]) {
  return Fragment(...args);
}

export function _a(...args: any[]) {
  return createDOMNodeBOX("a")(...args);
}
export function _abbr(...args: any[]) {
  return createDOMNodeBOX("a")(...args);
}
export function _address(...args: any[]) {
  return createDOMNodeBOX("address")(...args);
}
export function _area(...args: any[]) {
  return createDOMNodeBOX("area")(...args);
}
export function _article(...args: any[]) {
  return createDOMNodeBOX("article")(...args);
}
export function _aside(...args: any[]) {
  return createDOMNodeBOX("aside")(...args);
}
export function _audio(...args: any[]) {
  return createDOMNodeBOX("audio")(...args);
}
export function _b(...args: any[]) {
  return createDOMNodeBOX("b")(...args);
}
export function _base(...args: any[]) {
  return createDOMNodeBOX("base")(...args);
}
export function _bdi(...args: any[]) {
  return createDOMNodeBOX("bdi")(...args);
}
export function _bdo(...args: any[]) {
  return createDOMNodeBOX("bdo")(...args);
}
export function _blockquote(...args: any[]) {
  return createDOMNodeBOX("blockquote")(...args);
}
export function _body(...args: any[]) {
  return createDOMNodeBOX("body")(...args);
}
export function _br(...args: any[]) {
  return createDOMNodeBOX("br")(...args);
}
export function _button(...args: any[]) {
  return createDOMNodeBOX("button")(...args);
}
export function _canvas(...args: any[]) {
  return createDOMNodeBOX("canvas")(...args);
}
export function _caption(...args: any[]) {
  return createDOMNodeBOX("caption")(...args);
}
export function _cite(...args: any[]) {
  return createDOMNodeBOX("cite")(...args);
}
export function _code(...args: any[]) {
  return createDOMNodeBOX("code")(...args);
}
export function _col(...args: any[]) {
  return createDOMNodeBOX("col")(...args);
}
export function _colgroup(...args: any[]) {
  return createDOMNodeBOX("colgroup")(...args);
}
export function _data(...args: any[]) {
  return createDOMNodeBOX("data")(...args);
}
export function _datalist(...args: any[]) {
  return createDOMNodeBOX("datalist")(...args);
}
export function _dd(...args: any[]) {
  return createDOMNodeBOX("dd")(...args);
}
export function _del(...args: any[]) {
  return createDOMNodeBOX("del")(...args);
}
export function _details(...args: any[]) {
  return createDOMNodeBOX("datalist")(...args);
}
export function _dfn(...args: any[]) {
  return createDOMNodeBOX("dfn")(...args);
}
export function _dialog(...args: any[]) {
  return createDOMNodeBOX("dialog")(...args);
}
export function _dir(...args: any[]) {
  return createDOMNodeBOX("dir")(...args);
}
export function _div(...args: any[]) {
  return createDOMNodeBOX("div")(...args);
}
export function _dl(...args: any[]) {
  return createDOMNodeBOX("dl")(...args);
}
export function _dt(...args: any[]) {
  return createDOMNodeBOX("dt")(...args);
}
export function _em(...args: any[]) {
  return createDOMNodeBOX("em")(...args);
}
export function _embed(...args: any[]) {
  return createDOMNodeBOX("embed")(...args);
}
export function _fieldset(...args: any[]) {
  return createDOMNodeBOX("fieldset")(...args);
}
export function _figcaption(...args: any[]) {
  return createDOMNodeBOX("figcaption")(...args);
}
export function _figure(...args: any[]) {
  return createDOMNodeBOX("figure")(...args);
}
export function _font(...args: any[]) {
  return createDOMNodeBOX("font")(...args);
}
export function _footer(...args: any[]) {
  return createDOMNodeBOX("footer")(...args);
}
export function _form(...args: any[]) {
  return createDOMNodeBOX("form")(...args);
}
export function _frame(...args: any[]) {
  return createDOMNodeBOX("frame")(...args);
}
export function _frameset(...args: any[]) {
  return createDOMNodeBOX("frameset")(...args);
}
export function _h1(...args: any[]) {
  return createDOMNodeBOX("h1")(...args);
}
export function _h2(...args: any[]) {
  return createDOMNodeBOX("h2")(...args);
}
export function _h3(...args: any[]) {
  return createDOMNodeBOX("h3")(...args);
}
export function _h4(...args: any[]) {
  return createDOMNodeBOX("h4")(...args);
}
export function _h5(...args: any[]) {
  return createDOMNodeBOX("h5")(...args);
}
export function _h6(...args: any[]) {
  return createDOMNodeBOX("h6")(...args);
}
export function _head(...args: any[]) {
  return createDOMNodeBOX("head")(...args);
}
export function _header(...args: any[]) {
  return createDOMNodeBOX("header")(...args);
}
export function _hgroup(...args: any[]) {
  return createDOMNodeBOX("hgroup")(...args);
}
export function _hr(...args: any[]) {
  return createDOMNodeBOX("hr")(...args);
}
export function _html(...args: any[]) {
  return createDOMNodeBOX("html")(...args);
}
export function _i(...args: any[]) {
  return createDOMNodeBOX("i")(...args);
}
export function _iframe(...args: any[]) {
  return createDOMNodeBOX("iframe")(...args);
}
export function _img(...args: any[]) {
  return createDOMNodeBOX("img")(...args);
}
export function _input(...args: any[]) {
  return createDOMNodeBOX("input")(...args);
}
export function _ins(...args: any[]) {
  return createDOMNodeBOX("ins")(...args);
}
export function _kbd(...args: any[]) {
  return createDOMNodeBOX("kbd")(...args);
}
export function _label(...args: any[]) {
  return createDOMNodeBOX("label")(...args);
}
export function _legend(...args: any[]) {
  return createDOMNodeBOX("legend")(...args);
}
export function _li(...args: any[]) {
  return createDOMNodeBOX("li")(...args);
}
export function _link(...args: any[]) {
  return createDOMNodeBOX("link")(...args);
}
export function _main(...args: any[]) {
  return createDOMNodeBOX("main")(...args);
}
export function _map(...args: any[]) {
  return createDOMNodeBOX("map")(...args);
}
export function _mark(...args: any[]) {
  return createDOMNodeBOX("mark")(...args);
}
export function _marquee(...args: any[]) {
  return createDOMNodeBOX("marquee")(...args);
}
export function _menu(...args: any[]) {
  return createDOMNodeBOX("menu")(...args);
}
export function _meta(...args: any[]) {
  return createDOMNodeBOX("meta")(...args);
}
export function _meter(...args: any[]) {
  return createDOMNodeBOX("meter")(...args);
}
export function _nav(...args: any[]) {
  return createDOMNodeBOX("nav")(...args);
}
export function _noscript(...args: any[]) {
  return createDOMNodeBOX("noscript")(...args);
}
export function _object(...args: any[]) {
  return createDOMNodeBOX("object")(...args);
}
export function _ol(...args: any[]) {
  return createDOMNodeBOX("ol")(...args);
}
export function _optgroup(...args: any[]) {
  return createDOMNodeBOX("optgroup")(...args);
}
export function _option(...args: any[]) {
  return createDOMNodeBOX("option")(...args);
}
export function _output(...args: any[]) {
  return createDOMNodeBOX("output")(...args);
}
export function _p(...args: any[]) {
  return createDOMNodeBOX("p")(...args);
}
export function _param(...args: any[]) {
  return createDOMNodeBOX("param")(...args);
}
export function _picture(...args: any[]) {
  return createDOMNodeBOX("picture")(...args);
}
export function _pre(...args: any[]) {
  return createDOMNodeBOX("pre")(...args);
}
export function _progress(...args: any[]) {
  return createDOMNodeBOX("progress")(...args);
}
export function _q(...args: any[]) {
  return createDOMNodeBOX("q")(...args);
}
export function _rp(...args: any[]) {
  return createDOMNodeBOX("rp")(...args);
}
export function _rt(...args: any[]) {
  return createDOMNodeBOX("rt")(...args);
}
export function _ruby(...args: any[]) {
  return createDOMNodeBOX("ruby")(...args);
}
export function _s(...args: any[]) {
  return createDOMNodeBOX("s")(...args);
}
export function _samp(...args: any[]) {
  return createDOMNodeBOX("samp")(...args);
}
export function _script(...args: any[]) {
  return createDOMNodeBOX("script")(...args);
}
export function _section(...args: any[]) {
  return createDOMNodeBOX("section")(...args);
}
export function _select(...args: any[]) {
  return createDOMNodeBOX("select")(...args);
}
export function _slot(...args: any[]) {
  return createDOMNodeBOX("slot")(...args);
}
export function _small(...args: any[]) {
  return createDOMNodeBOX("small")(...args);
}

export function _source(...args: any[]) {
  return createDOMNodeBOX("source")(...args);
}
export function _span(...args: any[]) {
  return createDOMNodeBOX("span")(...args);
}
export function _strong(...args: any[]) {
  return createDOMNodeBOX("strong")(...args);
}
export function _style(...args: any[]) {
  return createDOMNodeBOX("style")(...args);
}
export function _sub(...args: any[]) {
  return createDOMNodeBOX("sub")(...args);
}
export function _summary(...args: any[]) {
  return createDOMNodeBOX("summary")(...args);
}
export function _sup(...args: any[]) {
  return createDOMNodeBOX("sup")(...args);
}
export function _table(...args: any[]) {
  return createDOMNodeBOX("table")(...args);
}
export function _tbody(...args: any[]) {
  return createDOMNodeBOX("tbody")(...args);
}
export function _td(...args: any[]) {
  return createDOMNodeBOX("td")(...args);
}
export function _template(...args: any[]) {
  return createDOMNodeBOX("template")(...args);
}
export function _textarea(...args: any[]) {
  return createDOMNodeBOX("textarea")(...args);
}
export function _tfoot(...args: any[]) {
  return createDOMNodeBOX("tfoot")(...args);
}
export function _th(...args: any[]) {
  return createDOMNodeBOX("th")(...args);
}
export function _thead(...args: any[]) {
  return createDOMNodeBOX("thead")(...args);
}
export function _time(...args: any[]) {
  return createDOMNodeBOX("time")(...args);
}
export function _title(...args: any[]) {
  return createDOMNodeBOX("title")(...args);
}
export function _tr(...args: any[]) {
  return createDOMNodeBOX("tr")(...args);
}
export function _track(...args: any[]) {
  return createDOMNodeBOX("track")(...args);
}
export function _u(...args: any[]) {
  return createDOMNodeBOX("u")(...args);
}
export function _ul(...args: any[]) {
  return createDOMNodeBOX("ul")(...args);
}
export function _var(...args: any[]) {
  return createDOMNodeBOX("var")(...args);
}
export function _video(...args: any[]) {
  return createDOMNodeBOX("video")(...args);
}
export function _wbr(...args: any[]) {
  return createDOMNodeBOX("wbr")(...args);
}

export function _listing(...args: any[]) {
  return createDOMNodeBOX("listing")(...args);
}
export function _xmp(...args: any[]) {
  return createDOMNodeBOX("xmp")(...args);
}

_custom.make = function (tag: string, amount: number) {
  return MakeAmount.call(
    () => {
      return _custom(tag);
    },
    this,
    amount
  ) as ReturnType<typeof this>[];
};

_fragment.make = (amount: number) => {
  let count = amount;
  const frags: DOMNodeBoxFragment[] = [];
  while (count--) {
    frags.push(Fragment());
  }
  return frags;
};

_a.make = (amount: number) => createDOMNodeBOX("a", amount);
_abbr.make = (amount: number) => createDOMNodeBOX("abbr", amount);
_address.make = (amount: number) => createDOMNodeBOX("address", amount);
_area.make = (amount: number) => createDOMNodeBOX("area", amount);
_article.make = (amount: number) => createDOMNodeBOX("article", amount);
_aside.make = (amount: number) => createDOMNodeBOX("aside", amount);
_audio.make = (amount: number) => createDOMNodeBOX("audio", amount);
_b.make = (amount: number) => createDOMNodeBOX("b", amount);
_base.make = (amount: number) => createDOMNodeBOX("base", amount);
_bdi.make = (amount: number) => createDOMNodeBOX("bdi", amount);
_bdo.make = (amount: number) => createDOMNodeBOX("bdo", amount);
_blockquote.make = (amount: number) => createDOMNodeBOX("blockquote", amount);
_body.make = (amount: number) => createDOMNodeBOX("body", amount);
_br.make = (amount: number) => createDOMNodeBOX("br", amount);
_button.make = (amount: number) => createDOMNodeBOX("button", amount);
_canvas.make = (amount: number) => createDOMNodeBOX("canvas", amount);
_caption.make = (amount: number) => createDOMNodeBOX("caption", amount);
_cite.make = (amount: number) => createDOMNodeBOX("cite", amount);
_code.make = (amount: number) => createDOMNodeBOX("code", amount);
_col.make = (amount: number) => createDOMNodeBOX("col", amount);
_colgroup.make = (amount: number) => createDOMNodeBOX("colgroup", amount);
_data.make = (amount: number) => createDOMNodeBOX("data", amount);
_datalist.make = (amount: number) => createDOMNodeBOX("datalist", amount);
_dd.make = (amount: number) => createDOMNodeBOX("dd", amount);
_del.make = (amount: number) => createDOMNodeBOX("del", amount);
_details.make = (amount: number) => createDOMNodeBOX("details", amount);
_dfn.make = (amount: number) => createDOMNodeBOX("dfn", amount);
_dialog.make = (amount: number) => createDOMNodeBOX("dialog", amount);
_dir.make = (amount: number) => createDOMNodeBOX("dir", amount);
_div.make = (amount: number) => createDOMNodeBOX("div", amount);
_dl.make = (amount: number) => createDOMNodeBOX("dl", amount);
_dt.make = (amount: number) => createDOMNodeBOX("dt", amount);
_em.make = (amount: number) => createDOMNodeBOX("em", amount);
_embed.make = (amount: number) => createDOMNodeBOX("embed", amount);
_fieldset.make = (amount: number) => createDOMNodeBOX("fieldset", amount);
_figcaption.make = (amount: number) => createDOMNodeBOX("figcaption", amount);
_figure.make = (amount: number) => createDOMNodeBOX("figure", amount);
_font.make = (amount: number) => createDOMNodeBOX("font", amount);
_footer.make = (amount: number) => createDOMNodeBOX("footer", amount);
_form.make = (amount: number) => createDOMNodeBOX("form", amount);
_frame.make = (amount: number) => createDOMNodeBOX("frame", amount);
_frameset.make = (amount: number) => createDOMNodeBOX("frameset", amount);
_h1.make = (amount: number) => createDOMNodeBOX("h1", amount);
_h2.make = (amount: number) => createDOMNodeBOX("h2", amount);
_h3.make = (amount: number) => createDOMNodeBOX("h3", amount);
_h4.make = (amount: number) => createDOMNodeBOX("h4", amount);
_h5.make = (amount: number) => createDOMNodeBOX("h5", amount);
_h6.make = (amount: number) => createDOMNodeBOX("h6", amount);
_head.make = (amount: number) => createDOMNodeBOX("head", amount);
_header.make = (amount: number) => createDOMNodeBOX("header", amount);
_hgroup.make = (amount: number) => createDOMNodeBOX("hgroup", amount);
_hr.make = (amount: number) => createDOMNodeBOX("hr", amount);
_html.make = (amount: number) => createDOMNodeBOX("html", amount);
_i.make = (amount: number) => createDOMNodeBOX("i", amount);
_iframe.make = (amount: number) => createDOMNodeBOX("iframe", amount);
_img.make = (amount: number) => createDOMNodeBOX("img", amount);
_input.make = (amount: number) => createDOMNodeBOX("input", amount);
_ins.make = (amount: number) => createDOMNodeBOX("ins", amount);
_kbd.make = (amount: number) => createDOMNodeBOX("kbd", amount);
_label.make = (amount: number) => createDOMNodeBOX("label", amount);
_legend.make = (amount: number) => createDOMNodeBOX("legend", amount);
_li.make = (amount: number) => createDOMNodeBOX("li", amount);
_link.make = (amount: number) => createDOMNodeBOX("link", amount);
_main.make = (amount: number) => createDOMNodeBOX("main", amount);
_map.make = (amount: number) => createDOMNodeBOX("map", amount);
_mark.make = (amount: number) => createDOMNodeBOX("mark", amount);
_marquee.make = (amount: number) => createDOMNodeBOX("marquee", amount);
_menu.make = (amount: number) => createDOMNodeBOX("menu", amount);
_meta.make = (amount: number) => createDOMNodeBOX("meta", amount);
_meter.make = (amount: number) => createDOMNodeBOX("meter", amount);
_nav.make = (amount: number) => createDOMNodeBOX("nav", amount);
_noscript.make = (amount: number) => createDOMNodeBOX("noscript", amount);
_object.make = (amount: number) => createDOMNodeBOX("object", amount);
_ol.make = (amount: number) => createDOMNodeBOX("ol", amount);
_optgroup.make = (amount: number) => createDOMNodeBOX("optgroup", amount);
_option.make = (amount: number) => createDOMNodeBOX("option", amount);
_output.make = (amount: number) => createDOMNodeBOX("output", amount);
_p.make = (amount: number) => createDOMNodeBOX("p", amount);
_param.make = (amount: number) => createDOMNodeBOX("param", amount);
_picture.make = (amount: number) => createDOMNodeBOX("picture", amount);
_pre.make = (amount: number) => createDOMNodeBOX("pre", amount);
_progress.make = (amount: number) => createDOMNodeBOX("progress", amount);
_q.make = (amount: number) => createDOMNodeBOX("q", amount);
_rp.make = (amount: number) => createDOMNodeBOX("rp", amount);
_rt.make = (amount: number) => createDOMNodeBOX("rt", amount);
_ruby.make = (amount: number) => createDOMNodeBOX("ruby", amount);
_s.make = (amount: number) => createDOMNodeBOX("s", amount);
_samp.make = (amount: number) => createDOMNodeBOX("samp", amount);
_script.make = (amount: number) => createDOMNodeBOX("script", amount);
_section.make = (amount: number) => createDOMNodeBOX("section", amount);
_select.make = (amount: number) => createDOMNodeBOX("select", amount);
_slot.make = (amount: number) => createDOMNodeBOX("slot", amount);
_small.make = (amount: number) => createDOMNodeBOX("small", amount);
_source.make = (amount: number) => createDOMNodeBOX("source", amount);
_span.make = (amount: number) => createDOMNodeBOX("span", amount);
_strong.make = (amount: number) => createDOMNodeBOX("strong", amount);
_style.make = (amount: number) => createDOMNodeBOX("style", amount);
_sub.make = (amount: number) => createDOMNodeBOX("sub", amount);
_summary.make = (amount: number) => createDOMNodeBOX("summary", amount);
_sup.make = (amount: number) => createDOMNodeBOX("sup", amount);
_table.make = (amount: number) => createDOMNodeBOX("table", amount);
_tbody.make = (amount: number) => createDOMNodeBOX("tbody", amount);
_td.make = (amount: number) => createDOMNodeBOX("td", amount);
_template.make = (amount: number) => createDOMNodeBOX("template", amount);
_textarea.make = (amount: number) => createDOMNodeBOX("textarea", amount);
_tfoot.make = (amount: number) => createDOMNodeBOX("tfoot", amount);
_th.make = (amount: number) => createDOMNodeBOX("th", amount);
_thead.make = (amount: number) => createDOMNodeBOX("thead", amount);
_time.make = (amount: number) => createDOMNodeBOX("time", amount);
_title.make = (amount: number) => createDOMNodeBOX("title", amount);
_tr.make = (amount: number) => createDOMNodeBOX("tr", amount);
_track.make = (amount: number) => createDOMNodeBOX("track", amount);
_u.make = (amount: number) => createDOMNodeBOX("u", amount);
_ul.make = (amount: number) => createDOMNodeBOX("ul", amount);
_var.make = (amount: number) => createDOMNodeBOX("var", amount);
_video.make = (amount: number) => createDOMNodeBOX("video", amount);
_wbr.make = (amount: number) => createDOMNodeBOX("wbr", amount);

_listing.make = (amount: number) => createDOMNodeBOX("listing", amount);
_xmp.make = (amount: number) => createDOMNodeBOX("xmp", amount);
