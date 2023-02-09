let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


fetch('http://localhost:3000/toys')
.then(res=>res.json())
.then(toyData=>
{
    renderToyCards(toyData);
})

//////////////////////////////
// RENDERS CARD FOR EACH TOY
/////////////////////////////

function renderToyCards(toyData)
{
  toyData.forEach(toy=>
  {
    const div=document.createElement('div');
    div.classList.add('card');
    const h2=document.createElement('h2');
    h2.textContent=toy.name;
    const img=document.createElement('img');
    img.src=toy.image;
    img.classList.add("toy-avatar");
    const p=document.createElement('p');
    p.textContent=toy.likes;
    const button=document.createElement('button');
    button.textContent='Like ❤️';
    button.setAttribute('id','[toy_id]');

    div.append(h2,img,p,button);
    document.querySelector("#toy-collection").append(div);
  })
}

/////////////////////////////////
// ADD EVENT LISTENER FOR SUBMIT
////////////////////////////////

let form=document.querySelector('.add-toy-form')
form.addEventListener('submit',event=>{
  event.preventDefault();
  addNewToy(event);
});

function addNewToy(event)
{
  console.log(event.target[0].value);
  let formData=
  {
   name: event.target[0].value,
   image: event.target[1].value,
   likes:0
  }

  return fetch('http://localhost:3000/toys',
  {
    method:"POST",
    headers:
    {
      'Content-Type':'application/json',
      'Accepts': 'application/json'
    },
    body:JSON.stringify(formData)
  })
}

