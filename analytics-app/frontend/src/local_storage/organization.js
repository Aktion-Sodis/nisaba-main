import { reactive } from "vue"


export const getRememberedOrganization = () => {
    return JSON.parse(localStorage.getItem("organization"))
}

const getOrganizationName = () => {
    try{
        return getRememberedOrganization().nameVerbose;
    }
    catch(e){
        return import.meta.env.VITE_APP_SOCIETY_VERBOSE_NAME;
    }
}


export const rememberedOrganizationName = reactive({
    value: getRememberedOrganization().nameVerbose,
    refresh(){
       this.value = getOrganizationName() 
    }
})

export const rememberOrganization = (json) => {
    localStorage.setItem("organization", JSON.stringify(json))
    rememberedOrganizationName.refresh()
}