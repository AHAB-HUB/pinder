
async function getAccount(id) {
  let response = await fetch(`http://localhost:4412/api/user/${id}`);
  return response.json()
}

async function uploadImg(file, uid, id) {
  const formData = new FormData();

  for (const name in file) {
    formData.append("image", file[name]);
  }

const uploadImg = await fetch(`http://localhost:4412/api/upload/${uid}/${id}`, {
  method: 'POST',
  body: formData,
  headers: { 'Content-Type': 'multipart/form-data' }
})
  .then(res => console.log(res.json()))
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));

}


function newPet(data, file) {
  fetch('http://localhost:4412/api/newpet', {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': 'application/json' }
  })
    .then(console.log(this.uploadImg(file, data.users_id, data.id)))
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}

function update(isUser, data) {
  (isUser) ?
    fetch('http://localhost:4412/api/updateuser', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))
    :
    fetch(`http://localhost:4412/api/updatepet`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))
}

module.exports = {
  getAccount: getAccount,
  update: update,
  uploadImg: uploadImg,
  newPet: newPet
}