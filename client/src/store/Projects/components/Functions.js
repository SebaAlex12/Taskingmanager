export const getProjectIdsByNames = (names,projects) => {

    const ids = projects.map(project=>{
        if(names.includes(project.name)){
            return project._id;
        }
    }).filter(item => item !== undefined);

    return ids;
}