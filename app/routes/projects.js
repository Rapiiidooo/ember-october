import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return fetch('https://api.october.eu/projects').then(function (response) {
            let listProjects = [];
            return response.json().then(function (json) {
                json.projects.forEach(element => {
                    try {
                        if (element.illustration) {
                            listProjects.push('https://cdn.october.eu/' + element.illustration.url)
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
                console.log(listProjects);
                return listProjects;
            });
        });
    }
});
