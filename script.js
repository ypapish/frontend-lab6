document.getElementById('download-button').addEventListener('click', fetchUsersData);

async function fetchUsersData() {
    const profilesContainer = document.getElementById('profilesContainer');
    const resultLabel = document.getElementById('result-label');
    
    resultLabel.innerText = 'Завантаження...';
    profilesContainer.innerHTML = '';
    
    const promises = [];
    for (let i = 0; i < 5; i++) {
        promises.push(
            fetch('https://randomuser.me/api/')
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    addUserToContainer(data.results[0], profilesContainer);
                    return data;
                })
        );
    }
    
    await Promise.all(promises);
    resultLabel.innerText = 'Успішно';
}

function addUserToContainer(user, container) {
    const profileDiv = document.createElement('div');
    profileDiv.className = 'profile';
    
    profileDiv.innerHTML = `
        <img src="${user.picture.large}" alt="User Photo" class="user-photo">
        <p><strong>City:</strong> ${user.location.city}</p>
        <p><strong>Country:</strong> ${user.location.country}</p>
        <p><strong>Postcode:</strong> ${user.location.postcode}</p>
        <p><strong>Email:</strong> ${user.email}</p>
    `;
    
    container.appendChild(profileDiv);
}
