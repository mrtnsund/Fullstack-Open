(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),c=t(13),r=t.n(c),o=(t(19),t(2)),i=function(e){return u.a.createElement("div",{id:e.person.id},e.person.name," ",e.person.number," ",u.a.createElement("button",{onClick:e.onSubmit},"delete"))},l=function(e){var n=e.message;return null===n?null:"A"===n.charAt(0)||"C"===n.charAt(0)?u.a.createElement("div",{className:"add"},n):u.a.createElement("div",{className:"delete"},n)},m=t(3),f=t.n(m),d="/api/persons",s=function(){return f.a.get(d).then((function(e){return e.data}))},b=function(e){return f.a.post(d,e).then((function(e){return e.data}))},h=function(e,n){return f.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return f.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},v=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),m=Object(o.a)(r,2),f=m[0],d=m[1],v=Object(a.useState)(""),E=Object(o.a)(v,2),w=E[0],g=E[1],j=Object(a.useState)(""),O=Object(o.a)(j,2),k=O[0],C=O[1],S=Object(a.useState)(null),y=Object(o.a)(S,2),A=y[0],T=y[1];Object(a.useEffect)((function(){s().then((function(e){c(e)}))}),[]);var D=0===k.length?t:t.filter((function(e){return e.name.toLowerCase().includes(k.toLowerCase())})),N=function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Do you want to delete ".concat(n.name,"?"))&&(p(e).then(c((function(n){return n.filter((function(n){return n.id!==e}))}))),T("Deleted ".concat(n.name)),setTimeout((function(){T(null)}),3e3))},J=function(e){var n=t.find((function(n){return n.name===e.name})),a={name:n.name,number:e.number};h(n.id,a).then((function(e){c((function(e){return e.filter((function(e){return e.id!==n.id}))})),c(t.concat(a)),T("Changed ".concat(a.name)),setTimeout((function(){T(null)}),3e3)})).catch((function(e){T("".concat(a.name," is already removed from server")),setTimeout((function(){T(null)}),3e3)}))};return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(l,{message:A}),u.a.createElement("div",null,"filter shown with: ",u.a.createElement("input",{value:k,onChange:function(e){C(e.target.value)}})),u.a.createElement("h2",null,"add a new"),u.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n={name:f,number:w};t.some((function(e){return e.name===f}))?window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))&&J(n):b(n).then((function(e){c(t.concat(e)),d(""),g(""),T("Added ".concat(e.name)),setTimeout((function(){T(null)}),3e3)}))}},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:f,onChange:function(e){d(e.target.value)}})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{value:w,onChange:function(e){g(e.target.value)}})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add"))),u.a.createElement("h2",null,"Numbers"),D.map((function(e,n){return u.a.createElement(i,{key:n,person:e,onSubmit:function(){return N(e.id)}})})))};r.a.render(u.a.createElement(v,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.9cc376b5.chunk.js.map