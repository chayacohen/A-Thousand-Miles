export const isGoogle = () => {
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
            const googleMapScript = document.querySelector('.google');
                 if (googleMapScript) {
                    resolve();
                    clearInterval(intervalId)
                }
        }, 100)
    })
} 
