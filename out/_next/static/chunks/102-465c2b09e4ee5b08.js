"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[102],{93826:function(e,a,r){r(85893),r(67294)},57102:function(e,a,r){r.d(a,{Z:function(){return M}});var s=r(828),n=r(85893),t=r(41664),c=r.n(t),o=r(67294);r(96245);var l=r(47568),i=r(34051),d=r.n(i),u=(r(93826),r(2418)),h=r.n(u),m=r(40158),x=r(14097),f=r.n(x),g=r(34853),p=r(99205),b=r(6212),j=r(2914),v=r(21608),N=r(31555),y=r(35005),k=r(51852),Z="69wHAt420tHe1337FuCk95SabotagE",w="6LfyJv8nAAAAAA2pjyLysZ9EI6aj5SaCwJs2Pooz",C=function(e){var a=e.updateUser,r=e.onClose,s=e.handleSuccessfulLogin,t=e.onLoginSuccess,c=e.show,i=(e.onUserNameChange,e.lowFunds),u=e.onProfileDataTransfer,x=e.onDataCollected,C=(e.isMobile,function(e){return new Promise((function(a,r){h().hash(e,le,(function(e,s){if(e)return console.error("Error hashing password:",e),void r(e);a(s)}))}))}),E=(0,o.useState)(!0),S=E[0],L=E[1],A=(0,o.useState)(""),q=A[0],P=A[1],M=(0,o.useState)(""),T=M[0],U=M[1],z=(0,o.useState)(""),B=z[0],I=z[1],H=(0,o.useState)(null),_=H[0],V=H[1],D=(0,o.useState)(null),F=D[0],R=D[1],J=(0,o.useState)(null),G=J[0],O=J[1],Q=(0,o.useState)(!1),X=(Q[0],Q[1]),$=(0,o.useState)(""),W=($[0],$[1],(0,o.useState)(!1)),K=W[0],Y=W[1],ee=o.createRef(),ae=f().query,re=new(f().Client)({secret:"fnAE08dVuQAAzmq9bTtX7syJVE3CBSJwcIihlFak",domain:"db.eu.fauna.com",scheme:"https"}),se=function(e){P(e.target.value),p.includes(e.target.value.toLowerCase())?X(!0):X(!1)},ne=function(e){U(e.target.value)},te=function(){x(G)};(0,o.useEffect)((function(){!0===F&&(s(),t(q),a(G),te())}),[F]);var ce=function(){var e=(0,l.Z)(d().mark((function e(r){var n,c;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),!S){e.next=22;break}return console.log("Logging in..."),e.prev=3,e.next=6,C(T);case 6:return n=e.sent,e.next=9,me(q,n);case 9:console.log("Logged in!"),s(),t(q),a(G),te(),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(3),console.error("Error during login:",e.t0),R(!1);case 20:e.next=36;break;case 22:return console.log("Registering..."),e.prev=23,e.next=26,C(T);case 26:return c=e.sent,e.next=29,he(c);case 29:console.log("Registered!"),e.next=36;break;case 32:e.prev=32,e.t1=e.catch(23),console.error("Error during registration:",e.t1),V(!1);case 36:case"end":return e.stop()}}),e,null,[[3,16],[23,32]])})));return function(a){return e.apply(this,arguments)}}(),oe=function(){L(!S)};if(!c||null!=i&&S)return null;var le=10,ie={userName:q},de={alg:"HS256",typ:"JWT"},ue=m.sign({header:de,payload:ie,secret:Z}),he=function(){var e=(0,l.Z)(d().mark((function e(a){var r,s;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("checking for user"),!q||!a){e.next=25;break}return console.log("generating token"),e.prev=3,console.log("signature"),r="".concat(ue),console.log("token generated"),console.log("accessing fauna"),e.prev=8,console.log("trying to access fauna"),e.next=12,re.query(ae.Let({match:ae.Match(ae.Index("user_by_name"),[q]),data:{userName:q,hashedPassword:a,userToken:r}},ae.If(ae.Exists(ae.Var("match")),"User already exists",ae.Create(ae.Collection("users"),{data:{userEmail:"",userName:q,hashedPassword:a,userToken:r,userBets:""}}))));case 12:s=e.sent,V("User already exists"!==s),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(8),console.log("cant access user"),console.error("Error:",e.t0);case 20:e.next=25;break;case 22:e.prev=22,e.t1=e.catch(3),console.error("Error signing token:",e.t1);case 25:case"end":return e.stop()}}),e,null,[[3,22],[8,16]])})));return function(a){return e.apply(this,arguments)}}();function me(e,a){return xe.apply(this,arguments)}function xe(){return xe=(0,l.Z)(d().mark((function e(r,s){var n,t,c;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.prev=2,e.next=5,re.query(ae.Let({match:ae.Match(ae.Index("user_by_name"),[r]),data:{userName:r,hashedPassword:s,userToken:c}},ae.If(ae.Exists(ae.Var("match")),ae.Get(ae.Var("match")),"User not found")));case 5:n=e.sent,e.next=12;break;case 8:e.prev=8,e.t0=e.catch(2),console.log("cant access user"),console.error("Error:",e.t0);case 12:if(n){e.next=14;break}throw new Error("User not found.");case 14:return e.next=16,h().compare(T,n.data.hashedPassword);case 16:if(e.sent){e.next=19;break}throw new Error("Invalid password.");case 19:return t={userName:n.data.userName},c=m.sign({header:de,payload:t,secret:Z}),document.cookie="token=".concat(c,"; max-age=",72e4,"; samesite=strict; path=/"),R(!0),a(n.data),O(n.data),u(n.data),e.abrupt("return",c);case 29:return e.prev=29,e.t1=e.catch(0),R(!1),console.error("Error signing in user:",e.t1),e.abrupt("return",null);case 34:case"end":return e.stop()}}),e,null,[[0,29],[2,8]])}))),xe.apply(this,arguments)}var fe=function(e){Y(!0)};switch(S){case!0:return(0,n.jsxs)(b.Z,{show:c,onHide:r,className:"modal text-16 border-0",centered:!0,bg:"dark","data-bs-theme":"dark",children:[(0,n.jsx)(b.Z.Header,{closeButton:!0,className:"bg-dark text-white border-bottom border-gray border-0",children:(0,n.jsx)(b.Z.Title,{className:"text-center w-100 bg-dark border-0",children:"Sign In to MasterBetter"})}),(0,n.jsx)(b.Z.Body,{className:"modal-body bg-dark text-white border-0",children:(0,n.jsxs)(j.Z,{onSubmit:ce,children:[(0,n.jsxs)(v.Z,{className:"mb-3",children:[(0,n.jsx)(N.Z,{md:3,className:"text-start",children:(0,n.jsx)("label",{className:"form-label",children:"Enter your name:"})}),(0,n.jsx)(N.Z,{md:9,children:(0,n.jsx)(j.Z.Control,{type:"text",placeholder:"",value:q,onChange:se,pattern:"^[a-zA-Z0-9]+$",maxLength:"20",required:!0,title:"Nickname: Enter a nickname up to 20 characters containing only letters and numbers",size:"lg",className:"mb-3",style:{backgroundColor:"black",color:"white",placeholder:"lightgrey"}})})]}),(0,n.jsxs)(v.Z,{className:"mb-3",children:[(0,n.jsx)(N.Z,{md:3,className:"text-start",children:(0,n.jsx)("label",{className:"form-label",children:"Enter password:"})}),(0,n.jsx)(N.Z,{md:9,children:(0,n.jsx)(j.Z.Control,{type:"password",placeholder:"",value:T,onChange:ne,maxLength:"20",required:!0,title:"Password: Enter a password up to 20 characters",size:"lg",className:"mb-3",style:{backgroundColor:"black",color:"white"}})})]}),(0,n.jsxs)("div",{className:"mb-3 d-flex justify-content-center",children:[(0,n.jsx)("div",{className:"login-recaptcha",children:(0,n.jsx)(g.Z,{ref:ee,sitekey:w,onChange:fe,theme:"dark"})}),(0,n.jsx)("div",{className:"d-flex ps-0 mt-3"})]})]})}),(0,n.jsxs)(b.Z.Footer,{className:" bg-dark",children:[(0,n.jsx)(N.Z,{children:(0,n.jsx)(y.Z,{variant:"secondary",onClick:oe,style:{marginLeft:"auto"},children:S?"No account?":"Have an account?"})}),(0,n.jsx)(N.Z,{className:"text-end",children:(0,n.jsx)(y.Z,{variant:"primary",type:"submit",disabled:!T||!q||!K,style:{width:"65px",height:"40px"},className:"ml-2",onClick:ce,children:"Login"})})]})]});case!1:return(0,n.jsxs)(b.Z,{show:c,onHide:r,className:"modal text-16",centered:!0,children:[(0,n.jsx)(b.Z.Header,{closeButton:!0,className:"bg-dark text-white border-bottom border-gray text-16",children:(0,n.jsx)(b.Z.Title,{className:"text-center w-100 text-16",children:"Create MasterBetter account"})}),(0,n.jsx)(b.Z.Body,{className:"modal-body bg-dark text-white",children:(0,n.jsxs)(j.Z,{onSubmit:ce,children:[(0,n.jsxs)(v.Z,{className:"mb-3",children:[(0,n.jsx)(N.Z,{md:3,className:"text-start",children:(0,n.jsx)("label",{className:"form-label",children:"Enter your name:"})}),(0,n.jsx)(N.Z,{md:9,children:(0,n.jsx)(j.Z.Control,{type:"text",placeholder:"",value:q,onChange:se,pattern:"^[a-zA-Z0-9]+$",maxLength:"20",required:!0,title:"Nickname: Enter a nickname up to 20 characters containing only letters and numbers",size:"lg",className:"mb-3",style:{backgroundColor:"black",color:"white",placeholder:"lightgrey"}})})]}),(0,n.jsxs)(v.Z,{className:"mb-3",children:[(0,n.jsx)(N.Z,{md:3,className:"text-start",children:(0,n.jsx)("label",{className:"form-label",children:"Enter password:"})}),(0,n.jsx)(N.Z,{md:9,children:(0,n.jsx)(j.Z.Control,{type:"password",placeholder:"",value:T,onChange:ne,maxLength:"20",required:!0,title:"Password: Enter a password up to 20 characters",size:"lg",className:"mb-3",style:{backgroundColor:"black",color:"white"}})})]}),(0,n.jsxs)(v.Z,{className:"mb-3",children:[(0,n.jsx)(N.Z,{md:3,className:"text-start",children:(0,n.jsx)("label",{className:"form-label",children:"Confirm password:"})}),(0,n.jsx)(N.Z,{md:9,children:(0,n.jsx)(j.Z.Control,{type:"password",placeholder:"",value:B,onChange:function(e){I(e.target.value)},maxLength:"20",required:!0,title:"Password: Enter a password up to 20 characters",size:"lg",className:"mb-3",style:{backgroundColor:"black",color:"white"}})})]}),!S&&B!==T&&(0,n.jsx)(k.Z,{variant:"danger",className:"mb-3",children:"Passwords do not match"}),!0===_&&(0,n.jsx)(k.Z,{variant:"success",className:"mb-3",children:"Registration successful"}),!1===_&&(0,n.jsx)(k.Z,{variant:"danger",className:"mb-3",children:"Registration unsuccessful"}),!1===F&&(0,n.jsx)(k.Z,{variant:"danger",className:"mb-3",children:"Login unsuccessful"}),(0,n.jsx)("div",{className:"mb-3 d-flex justify-content-center",children:(0,n.jsx)("div",{className:"login-recaptcha",children:(0,n.jsx)(g.Z,{ref:ee,sitekey:w,onChange:fe,theme:"dark"})})})]})}),(0,n.jsxs)(b.Z.Footer,{className:" bg-dark",children:[(0,n.jsx)(N.Z,{children:(0,n.jsx)(y.Z,{variant:"secondary",onClick:oe,style:{marginLeft:"auto"},children:S?"No account?":"Have account?"})}),(0,n.jsx)(N.Z,{className:"text-end",children:(0,n.jsx)(y.Z,{variant:"primary",type:"submit",disabled:!T||!q||!K,style:{width:"80px",height:"40px"},className:"ml-2",onClick:ce,children:"Register"})})]})]});default:return(0,n.jsx)("div",{children:"oops! please reload"})}},E=r(11163),S=function(e){var a=e.onClose,r=e.user,s=e.showModalEmail,t=(e.isMobile,e.show),c=(0,o.useState)(""),i=c[0],u=c[1],h=(0,o.useState)(!1),m=h[0],x=h[1],g=(0,o.useState)(!1),p=g[0],b=g[1];if(!s)return null;var j=f().query,v=new(f().Client)({secret:"fnAE08dVuQAAzmq9bTtX7syJVE3CBSJwcIihlFak",domain:"db.eu.fauna.com",scheme:"https"});function N(e,a){return y.apply(this,arguments)}function y(){return(y=(0,l.Z)(d().mark((function e(a,r){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.query(j.Let({match:j.Match(j.Index("user_by_name"),a)},j.If(j.Exists(j.Var("match")),j.Update(j.Select(["ref"],j.Get(j.Var("match"))),{data:{userEmail:r}}),null))).catch((function(e){return console.error("Error: [%s] %s: %s",e.name,e.message,e.errors()[0].description)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var k=function(){var e=(0,l.Z)(d().mark((function e(a){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),b(!0),console.log("Updating email..."),e.prev=3,e.next=6,N(r.userName,i);case 6:console.log("Email updated!"),x(!0),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(3),console.error("Error during login:",e.t0),x(!1);case 14:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(a){return e.apply(this,arguments)}}();return(0,n.jsx)("div",{className:"modal fade ".concat(t?"show":""),style:{display:t?"block":"none"},"data-bs-focus":"true",children:(0,n.jsx)("div",{className:"modal-dialog modal-dialog-centered","data-bs-focus":"true",children:(0,n.jsxs)("div",{className:"modal-content","data-bs-focus":"true",children:[(0,n.jsxs)("div",{className:"modal-header","data-bs-focus":"true",children:[(0,n.jsx)("h4",{className:"modal-title",children:"Add or change email address"}),(0,n.jsx)("button",{type:"button",className:"close",onClick:a,children:(0,n.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]}),(0,n.jsx)("div",{className:"modal-body","data-bs-focus":"true",children:(0,n.jsxs)("form",{onSubmit:k,children:[(0,n.jsxs)("div",{className:"row ps-3 mb-2",children:["Current email: ",r.userEmail?r.userEmail:"none"]}),(0,n.jsxs)("div",{className:"input-group mb-3","data-bs-focus":"true",children:[(0,n.jsx)("span",{className:"input-group-text",id:"basic-addon1",children:"email"}),(0,n.jsx)("input",{ref:inputRef,className:"form-control form-control-lg col-12",type:"email",placeholder:"Enter your email",name:"formEmail",value:i,onChange:function(e){u(e.target.value)},pattern:"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]",maxLength:"255",required:!0,title:"Please enter a valid email address"})]}),!0===m&&!0===p?(0,n.jsx)("div",{className:"row mb-2",style:{color:"rgb(64, 255, 47)"},children:"Email updated successfully"}):null,!1===m&&!0===p?(0,n.jsx)("div",{className:"row mb-2",style:{color:"rgb(255, 0, 0)"},children:"Email not updated. Try again"}):null,(0,n.jsx)("div",{className:"d-flex justify-content-center mt-3",children:(0,n.jsx)("button",{className:"btn btn-primary",type:"button",disabled:!i,style:{cursor:i?"pointer":"not-allowed"},children:"Confirm"})})]})})]})})})},L=r(43998),A=r(10682),q=r(44874),P=r(8063);function M(e){var a=e.onLoggedInUserNameChange,r=e.onUpdateUser,t=e.onDataFromGrandchild,l=e.onDataToParent,i=e.cookieUser,d=e.isMobile,u=(0,s.Z)(o.useState({}),2),h=u[0],m=u[1],x=(0,o.useState)(!1),f=x[0],g=x[1],p=(0,o.useState)(!1),b=p[0],j=p[1],v=(0,o.useState)(null),N=v[0],y=v[1],k=(0,o.useState)(!1),Z=k[0],w=k[1],M=(0,E.useRouter)().pathname;(0,o.useEffect)((function(){i&&(m(i),y(i.userName),w(!0))}),[i]);var T=function(){g(!1)};(0,o.useEffect)((function(){}),[h]);var U=(0,o.useState)(null),z=(U[0],U[1],h||null),B=(0,o.useState)(!1),I=(B[0],B[1],"false");return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(L.Z,{expand:I,className:"bg-body-tertiary mb-0",bg:"dark","data-bs-theme":"dark",children:(0,n.jsxs)(A.Z,{fluid:!0,children:[(0,n.jsx)(L.Z.Brand,{href:"/",children:"MasterBetter"}),(0,n.jsx)(L.Z.Toggle,{"aria-controls":"offcanvasNavbar-expand-".concat(I)}),(0,n.jsxs)(L.Z.Offcanvas,{id:"offcanvasNavbar-expand-".concat(I),"aria-labelledby":"offcanvasNavbarLabel-expand-".concat(I),placement:"end",bg:"dark","data-bs-theme":"dark",children:[(0,n.jsx)(q.Z.Header,{closeButton:!0,children:(0,n.jsx)(q.Z.Title,{id:"offcanvasNavbarLabel-expand-".concat(I),children:Z?N:"Menu"})}),(0,n.jsx)(q.Z.Body,{children:(0,n.jsxs)(P.Z,{className:"justify-content-end flex-grow-1 pe-3",children:[Z||"/"!==M?null:(0,n.jsx)(P.Z.Link,{onClick:function(){g(!0)},children:"Sign In"}),(0,n.jsx)(P.Z.Link,{href:"/account",children:(0,n.jsx)(c(),{href:{pathname:"/account",query:z},children:(0,n.jsx)("div",{className:"col",children:"Account"})})}),(0,n.jsx)(P.Z.Link,{href:"/faq",children:(0,n.jsx)(c(),{href:"/faq",children:(0,n.jsx)("div",{className:"col",children:"How to play?"})})}),(0,n.jsx)(P.Z.Link,{href:"/changelog",children:(0,n.jsx)(c(),{href:"/changelog",children:(0,n.jsx)("div",{className:"col",children:"Patch Notes"})})}),(0,n.jsx)(P.Z.Link,{href:"/contact",children:(0,n.jsx)(c(),{href:"/contact",children:(0,n.jsx)("div",{className:"col",children:"Social"})})}),Z?(0,n.jsx)(P.Z.Link,{onClick:function(){return w(!1)},children:"Sign Out"}):null]})})]})]})},I),(0,n.jsx)(C,{show:f,onClose:T,updateUser:function(e){m(e)},handleSuccessfulLogin:T,onLoginSuccess:function(e){y(e),w(!0),a(h),r(h)},onUserNameChange:function(e){y(e)},onProfileDataTransfer:function(e){m(e)},onDataCollected:function(e){t(e),l(e)},isMobile:d}),(0,n.jsx)(S,{showModalEmail:b,onClose:function(){j(!1)},user:h,isMobile:d,show:b})]})}}}]);