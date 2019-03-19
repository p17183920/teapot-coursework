#version 430

in vec3 vertPos;
in vec3 N;
in vec3 lightPos;

struct MaterialInfo;

/*TODO:: Complete your shader code for a full Phong shading*/ 

//uniform vec3 Kd;            // Diffuse reflectivity
//uniform vec3 Ka;

//uniform vec3 Ks;
uniform vec3 Ld;            // Diffuse light intensity

uniform vec3 La;

uniform vec3 Ls;
uniform vec3 CameraPos;

uniform MaterialInfo Material;



// complete to a full phong shading
layout( location = 0 ) out vec4 FragColour;

struct MaterialInfo{
vec3 Ka;       //ambient reflectivity
vec3 Kd; //diffuse reflectivity
vec3 Ks;      //specular reflectivity
float shininess;      //shininess of the material
};

//play with attenuation/shininess factor present the results
//finish attenuation in phong function using the formula from lecture 7
//find out about shininess

vec3 phongADS()
{
     vec3 L = normalize(lightPos - vertPos);   //normalised light vector
     vec3 viewDirNormal = normalize(CameraPos - vertPos);
     vec3 reflectDirNormal = reflect(-L, N);
     float cosPangle = pow(max(dot(viewDirNormal, reflectDirNormal), 0.0), 4.0);
	 float distance = length(lightPos - vertPos); 
	 float attenuationConstant = 1.f;
	 float attenuationLinear = 1.f;
	 float attenuationQuadratic = 1.f;
	 

	 float attenuation = 1/(attenuationConstant + (attenuationLinear * distance) + (attenuationQuadratic * distance * distance));

     vec3 ambient = Material.Ka * La;
     vec3 diffuse = Material.Kd * Ld * max(dot(N,L), 0.0);   
     vec3 specular = Material.Ks * Ls * cosPangle ;   
	 
     return clamp(ambient + attenuation*(diffuse + specular), 0.0, 1.0); //replace 0.82 with attenuation
}

void main() {



 
                    //Calculate the light vector
                   // vec3 L = normalize(lightPos - vertPos);                  //giving the normalised light vector
                     
                    //vec3 vNormal = normalize(vertPos);
                   // vec3 viewDirNormal = normalize(CameraPos - vertPos);
                   // vec3 reflectDirNormal = reflect(-L, N);
                   //float cosPangle = pow(max(dot(viewDirNormal, reflectDirNormal), 0.0), 4.0);
                   
                  
                  //float attenuation = length(lightPos - vertPos); 
                    
                    
                  
                   // vec3 ambient = Ka * La;
                   // vec3 diffuse = Kd * Ld * max(dot(N,L), 0.0);   
                   // vec3 specular = Ks * Ls * cosPangle ;                     //pow(cosPangle,4.0)
                    //vec3 ADS= clamp ( ambient + attenuation*(diffuse + specular) , 0.0 , 1.0); 
 

 vec3 ADS = phongADS();
 FragColour = vec4( ADS, 1.0);

}
