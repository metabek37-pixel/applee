const products = {
 iphone17pro:{name:"iPhone 17 Pro",type:"iPhone",price:19990000,image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=90",description:"Kuchli kamera tizimi, yorqin displey va yuqori unumdorlikka ega zamonaviy smartfon.",storage:["256 GB","512 GB","1 TB"],colors:[["Kosmik to‘q sariq","#c77b4c"],["Kumush","#d8d8d8"],["To‘q ko‘k","#394c68"]],specs:["Displey: 6.3 dyuym Super Retina XDR","Chip: A19 Pro (demo tavsif)","Kamera: Pro kamera tizimi","Ulanish: USB‑C"]},
 ipadair:{name:"iPad Air",type:"iPad",price:8490000,image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=90",description:"Ijod, o‘qish va kundalik vazifalar uchun qulay va yengil planshet.",storage:["128 GB","256 GB","512 GB","1 TB"],colors:[["Ko‘k","#a9c9e5"],["Binafsha","#c9bbdf"],["Yulduzrang","#dedbd2"]],specs:["Displey: Liquid Retina","Chip: M4 (demo tavsif)","Kamera: 12 MP","Aksessuar: Apple Pencil qo‘llab-quvvatlashi"]},
 macbookair:{name:"MacBook Air 13″",type:"Mac",price:15990000,image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=90",description:"Yupqa, yengil va kundalik ishlar uchun qulay noutbuk.",storage:["256 GB SSD / 16 GB RAM","512 GB SSD / 16 GB RAM","1 TB SSD / 24 GB RAM"],colors:[["Osmon ko‘k","#9eb8ce"],["Kumush","#d8d8d8"],["Yulduzrang","#d4cbbd"]],specs:["Ekran: 13.6 dyuym","Chip: Apple M5 (demo tavsif)","Batareya: uzoq ishlash vaqti","Portlar: USB‑C / MagSafe"]},
 watch11:{name:"Apple Watch Series 11",type:"Watch",price:5490000,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=90",description:"Kundalik faollik va salomatlik ko‘rsatkichlarini kuzatishga yordam beruvchi aqlli soat.",storage:["GPS 42 mm","GPS 46 mm","GPS + Cellular 46 mm"],colors:[["Qora","#242424"],["Kumush","#d8d8d8"],["Pushti","#d9a9a9"]],specs:["Displey: Always-On Retina","Suvga chidamlilik: modelga bog‘liq","Funksiyalar: faollik va uyqu kuzatuvi","Moslik: iPhone bilan"]},
 airpodspro:{name:"AirPods Pro 3",type:"Audio",price:3290000,image:"https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=90",description:"Qulay simsiz quloqchinlar va shovqinni kamaytirish texnologiyasi.",storage:["Standart g‘ilof"],colors:[["Oq","#f5f5f5"]],specs:["Faol shovqinni kamaytirish","Shaffoflik rejimi","Simsiz quvvatlash g‘ilofi","Bluetooth ulanish"]},
 macbookpro:{name:"MacBook Pro 14″",type:"Mac",price:24990000,image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=90",description:"Professional vazifalar, ijod va yuqori unumdorlik uchun noutbuk.",storage:["512 GB SSD / 18 GB RAM","1 TB SSD / 24 GB RAM","2 TB SSD / 36 GB RAM"],colors:[["Space Black","#252525"],["Silver","#d8d8d8"]],specs:["Ekran: 14.2 dyuym Liquid Retina XDR","Chip: M5 Pro (demo tavsif)","Portlar: Thunderbolt, HDMI, SDXC","Pro ish jarayonlari uchun"]}}
;
const money = n => new Intl.NumberFormat("uz-UZ").format(n)+" so‘m";
const productModal=document.getElementById("productModal"),authModal=document.getElementById("authModal");
let selectedProduct=null,selectedColor="";
function openModal(el){el.classList.add("open");el.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeModal(el){el.classList.remove("open");el.setAttribute("aria-hidden","true");document.body.style.overflow=""}
function showProduct(id){
 const p=products[id];if(!p)return;selectedProduct=id;selectedColor=p.colors[0][0];
 document.getElementById("modalImage").src=p.image;document.getElementById("modalImage").alt=p.name;
 document.getElementById("modalType").textContent=p.type.toUpperCase();
 document.getElementById("modalTitle").textContent=p.name;
 document.getElementById("modalDescription").textContent=p.description;
 document.getElementById("modalPrice").textContent=money(p.price);
 const select=document.getElementById("storageSelect");select.innerHTML=p.storage.map(x=>`<option>${x}</option>`).join("");
 document.getElementById("colorOptions").innerHTML=p.colors.map((c,i)=>`<button class="color-choice ${i===0?"selected":""}" title="${c[0]}" aria-label="${c[0]}" style="background:${c[1]}" data-color="${c[0]}"></button>`).join("");
 document.getElementById("specList").innerHTML=p.specs.map(x=>`<div>• ${x}</div>`).join("");
 document.getElementById("colorOptions").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{selectedColor=b.dataset.color;document.querySelectorAll(".color-choice").forEach(x=>x.classList.toggle("selected",x===b))}));
 openModal(productModal);
}
document.querySelectorAll("[data-product]").forEach(b=>b.addEventListener("click",()=>showProduct(b.dataset.product)));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>{closeModal(productModal);closeModal(authModal)}));
[productModal,authModal].forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal(m)}));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal(productModal);closeModal(authModal)}});
document.getElementById("buyNow").addEventListener("click",()=>{
 const p=products[selectedProduct];if(!p)return;
 document.getElementById("orderSummary").textContent=`${p.name} · ${document.getElementById("storageSelect").value} · ${selectedColor} · ${money(p.price)}`;
 document.getElementById("formMessage").textContent="";
 closeModal(productModal);openModal(authModal);
});
document.getElementById("authForm").addEventListener("submit",e=>{
 e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;
 const p=products[selectedProduct];
 document.getElementById("formMessage").textContent=`Rahmat, ${form.fullName.value}! Demo buyurtmangiz qabul qilindi. Bu sayt serverga ulanmaganligi sababli haqiqiy buyurtma yuborilmadi.`;
 form.reset();
});
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
 const filter=btn.dataset.filter;let count=0;
 document.querySelectorAll(".product-card").forEach(card=>{const show=filter==="all"||card.dataset.category===filter;card.hidden=!show;if(show)count++});
 document.getElementById("emptyState").hidden=count!==0;
}));
document.getElementById("searchToggle").addEventListener("click",()=>{document.getElementById("searchPanel").classList.toggle("open");document.getElementById("searchInput").focus()});
document.getElementById("searchInput").addEventListener("input",e=>{
 const q=e.target.value.toLowerCase().trim();let count=0;
 document.querySelectorAll(".product-card").forEach(card=>{const show=card.innerText.toLowerCase().includes(q);card.hidden=!show;if(show)count++});
 document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
 document.getElementById("emptyState").hidden=count!==0;
});
document.getElementById("accountOpen").addEventListener("click",()=>{selectedProduct=selectedProduct||"iphone17pro";document.getElementById("orderSummary").textContent="Hisobga kirish / ro‘yxatdan o‘tish";openModal(authModal)});
document.getElementById("menuToggle").addEventListener("click",()=>document.querySelector(".desktop-nav").classList.toggle("show"));
document.querySelectorAll(".desktop-nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".desktop-nav").classList.remove("show")));
let slide=0;const track=document.getElementById("carouselTrack"),total=track.children.length;
function moveSlide(n){slide=(n+total)%total;track.style.transform=`translateX(-${slide*100}%)`}
document.getElementById("nextSlide").addEventListener("click",()=>moveSlide(slide+1));
document.getElementById("prevSlide").addEventListener("click",()=>moveSlide(slide-1));
