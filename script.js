const username = "sandipthapa543";

// Fetch User Profile
fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
        // Set profile image
        const profileImg = document.getElementById('profile');
        if (data.avatar_url) {
            profileImg.src = data.avatar_url;
        } else {
            profileImg.style.display = 'none'; // hide if no avatar
        }
        
        // Set Bio
        const bioElem = document.getElementById('bio');
        if (data.bio) {
            bioElem.textContent = `"${data.bio}"`;
        } else {
            bioElem.style.display = 'none';
        }
        
        // Set Followers
        document.getElementById('followers').innerHTML = `${data.followers} Followers`;
    })
    .catch(error => console.error('Error fetching GitHub profile:', error));

// Fetch Repositories
fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`) // Fetch top 6 recently updated
    .then(response => response.json())
    .then(data => {
        let html = '';
        data.forEach(repo => {
            const desc = repo.description ? repo.description : 'No description available for this repository.';
            const lang = repo.language ? repo.language : 'Unknown';
            
            html += `
                <div class="repo-card">
                    <div class="repo-header">
                        <i class='bx bx-book-bookmark'></i>
                        <a href="${repo.html_url}" target="_blank" class="repo-title">${repo.name}</a>
                    </div>
                    <p class="repo-desc">${desc}</p>
                    <div class="repo-footer">
                        <span class="repo-lang"><i class='bx bxs-circle'></i> ${lang}</span>
                        ${repo.stargazers_count > 0 ? `<span><i class='bx bx-star'></i> ${repo.stargazers_count}</span>` : ''}
                        ${repo.forks_count > 0 ? `<span><i class='bx bx-git-repo-forked'></i> ${repo.forks_count}</span>` : ''}
                    </div>
                </div>
            `;
        });
        document.getElementById('repos-grid').innerHTML = html;
    })
    .catch(error => {
        console.error('Error fetching repositories:', error);
        document.getElementById('repos-grid').innerHTML = '<p>Could not load repositories at this time.</p>';
    });
