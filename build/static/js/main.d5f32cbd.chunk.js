(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(2),r=t(0),c=t.n(r),u=t(11),i=t.n(u),o=t(3),l=t.n(o),m="/api/persons",s=function(){return l.a.get(m).then(function(e){return e.data})},f=function(e){return l.a.post(m,e).then(function(e){return e.data})},d=function(e,n){return l.a.put("".concat(m,"/").concat(e),n).then(function(e){return e.data})},h=function(e){return l.a.delete("".concat(m,"/").concat(e)).then(function(e){return e.data})},p=(t(37),function(e){var n=e.find,t=e.handleChange;return c.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4: ",c.a.createElement("input",{value:n,onChange:t}))}),v=function(e){var n=e.addName,t=e.newName,a=e.handleNameChange,r=e.newNumber,u=e.handleNumberChange;return c.a.createElement("form",{onSubmit:n},c.a.createElement("div",null,"nimi: ",c.a.createElement("input",{value:t,onChange:a})),c.a.createElement("div",null,"numero: ",c.a.createElement("input",{value:r,onChange:u})),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},E=function(e){var n=e.persons,t=e.find,a=e.deletePerson;return n.filter(function(e){return 0===t.length||e.name.toLowerCase().includes(t.toLowerCase())}).map(function(e){return c.a.createElement("p",{key:e.name},e.name,", ",e.number,c.a.createElement("button",{onClick:function(){return a(e.id)}},"Poista"))})},b=function(e){var n=e.message,t=e.isError;return null===n||void 0===n?null:t?c.a.createElement("div",{className:"error"},n):c.a.createElement("div",{className:"notification"},n)};i.a.render(c.a.createElement(function(){var e=Object(r.useState)([]),n=Object(a.a)(e,2),t=n[0],u=n[1],i=Object(r.useState)(""),o=Object(a.a)(i,2),l=o[0],m=o[1],g=Object(r.useState)(""),w=Object(a.a)(g,2),C=w[0],j=w[1],N=Object(r.useState)(""),O=Object(a.a)(N,2),k=O[0],P=O[1],S=Object(r.useState)(null),L=Object(a.a)(S,2),y=L[0],H=L[1],J=function(e,n){H({message:e,isError:n}),n||setTimeout(function(){H(null)},5e3)};return Object(r.useEffect)(function(){s().then(function(e){u(e)})},[]),c.a.createElement("div",null,c.a.createElement("h2",null,"Puhelinluettelo"),c.a.createElement(b,y),c.a.createElement(p,{find:k,handleChange:function(e){P(e.target.value)}}),c.a.createElement("h3",null,"lis\xe4\xe4 uusi"),c.a.createElement(v,{addName:function(e){e.preventDefault();var n={name:l,number:C},a=t.filter(function(e){return e.name.toLowerCase()===l.toLowerCase()});a.length>0?window.confirm("".concat(l," on jo luettelossa, korvataako numero?"))&&d(a[0].id,n).then(function(e){u(t.map(function(e){return e.id===a[0].id?{name:e.name,number:n.number,id:e.id}:e})),m(""),j(""),J("P\xe4ivitettiin ".concat(n.name))}).catch(function(e){return J("Henkil\xf6n ".concat(n.name," p\xe4ivitt\xe4minen ep\xe4onnistui: ").concat(e.response.data.error),!0)}):f(n).then(function(e){u(t.concat(e)),J("Lis\xe4ttiin ".concat(n.name)),m(""),j("")}).catch(function(e){return J("Henkil\xf6n ".concat(n.name," lis\xe4\xe4minen ep\xe4onnistui: ").concat(e.response.data.error),!0)})},newName:l,handleNameChange:function(e){m(e.target.value)},newNumber:C,handleNumberChange:function(e){j(e.target.value)}}),c.a.createElement("h2",null,"Numerot"),c.a.createElement(E,{persons:t,find:k,deletePerson:function(e){var n=t.filter(function(n){return n.id===e})[0].name;window.confirm("Poistetaanko ".concat(n,"?"))&&h(e).then(function(a){u(t.filter(function(n){return n.id!==e})),J("Poistettiin ".concat(n))}).catch(function(e){return J("Henkil\xf6n ".concat(n," poistaminen ep\xe4onnistui: ").concat(e.response.data.error),!0)})}}))},null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.d5f32cbd.chunk.js.map