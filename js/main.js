// Fetch and display GitHub star counts for all project cards
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.card-project');

  projectCards.forEach(card => {
    const onclickAttr = card.getAttribute('onclick');

    if (onclickAttr && onclickAttr.includes('github.com')) {
      // Extract GitHub URL from onclick attribute
      const urlMatch = onclickAttr.match(/https:\/\/github\.com\/([^\/]+)\/([^'\/\)]+)/);

      if (urlMatch) {
        const repo = urlMatch[2];

        // Fetch star count from proxy API
        fetch(`https://vercel-proxy-silk-ten.vercel.app/api/proxy?repo=${repo}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            const starCount = data.stars;

            // Create star count element
            const starElement = document.createElement('div');
            starElement.className = 'star-count';
            starElement.innerHTML = `⭐ ${starCount}`;

            // Add to img-wrapper to position relative to the image
            const imgWrapper = card.querySelector('.img-wrapper');
            if (imgWrapper) {
              imgWrapper.appendChild(starElement);
            }
          })
          .catch(error => {
            console.error(`Error fetching stars for ${repo}:`, error);
          });
      }
    }
  });
});
