# Vision
[Material Design](https://material.io/guidelines/) UI for [Spring Boot Actuator](http://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#production-ready)

## Made with ...
* [NPM](https://www.npmjs.com/) 
* [Angular JS](https://angularjs.org/)
* [Angular Material](https://material.angularjs.org/latest/)
* [Angular UI Router](https://ui-router.github.io/)
* [Moment JS](http://momentjs.com/)

## Setup
### Build a Spring Boot app with Spring Boot Actuator
1. Build Actuator Spring Boot app `<WORKING_DIR>$ cd test && mvn package`
2. Launch Actuator Spring Boot App `<WORKING_DIR>$ java -jar test/target/actuator-0.0.1.jar &`

If you have your own Spring Boot app, you can also use it ;) Don't forget to check your [conf](#configure-spring-boot-actuator).

### Build Vision
1. Build Vision `<WORKING_DIR>$ npm install`
2. Launch Vision `<WORKING_DIR>$ npm run dev`

## Configure Spring Boot Actuator
In your **application.properties**, verify and add them if they don't exist :
```
endpoints.cors.allowed-origins=*
endpoints.cors.allowed-methods=GET,POST
endpoints.shutdown.enabled=true
```

1. **Vision domain** : can be a domain like *http://vision.domain.com* or a wildcard (for simplicity, be careful)
2. **Autorized HTTP Methods** : GET and POST (for shutdown endpoint)
3. **Shutdown endpoint** : by default, it isn't activate because it's a dangerous feature. So activate it if you need it 

## Test
Follow the link [http://localhost:3000/](http://localhost:3000/)

## Contact
### Via GitHub > [Issues](https://github.com/fgruchala/Vision/issues)
Helpful for **question**, **bug** and **contribution request** 

### Via Twitter
* François GRUCHALA [@FGruchala](https://twitter.com/FGruchala)
* Boris COUTURIER [@Myzu_no](https://twitter.com/Myzu_no)
