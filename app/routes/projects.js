import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return fetch('https://api.october.eu/projects').then(async function (response) {
            return response.json().then(function (json) {
                json.projects.forEach(element => {
                    try {
                        // Add domain to img url
                        if (element.illustration) {
                            element.illustration.url = 'https://cdn.october.eu/' + element.illustration.url;
                        } else {
                            console.log('toto');
                            element.illustration = { url: '/assets/images/confidential.png' };
                        }

                        // Get day alepsed from now
                        var oneDay = 24*60*60*1000;
                        var oneHour = 60*60*1000;
                        var timeElepsed = new Date().getTime() - new Date(element.onlineDate).getTime();
                        element.onlineDate = Math.round(Math.abs((timeElepsed)/(oneDay)));
                        if (element.onlineDate === 0) {
                            element.onlineDate = (Math.round(Math.abs((timeElepsed)/(oneHour))) + 1).toString() + ' hours ago';
                        } else {
                            element.onlineDate = element.onlineDate.toString() + ' days ago'
                        }
                        
                        element.rate = element.rate.toFixed(2);
                        element.amount = element.amount.toLocaleString('en-GB');
                    } catch (error) {
                        console.log(error);
                    }
                });
                return json.projects;
            });
        });
    },
});