'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-9d9296c6cd22ac679179a492b3d1b4b84d1e2ac2fbefb82e62b61f3f13ec2df612be86c300b9f426a153f8c3a2832f7c7c992d061e5a15e19de227ca0d460b6a"' : 'data-bs-target="#xs-controllers-links-module-AppModule-9d9296c6cd22ac679179a492b3d1b4b84d1e2ac2fbefb82e62b61f3f13ec2df612be86c300b9f426a153f8c3a2832f7c7c992d061e5a15e19de227ca0d460b6a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-9d9296c6cd22ac679179a492b3d1b4b84d1e2ac2fbefb82e62b61f3f13ec2df612be86c300b9f426a153f8c3a2832f7c7c992d061e5a15e19de227ca0d460b6a"' :
                                            'id="xs-controllers-links-module-AppModule-9d9296c6cd22ac679179a492b3d1b4b84d1e2ac2fbefb82e62b61f3f13ec2df612be86c300b9f426a153f8c3a2832f7c7c992d061e5a15e19de227ca0d460b6a"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-9d9296c6cd22ac679179a492b3d1b4b84d1e2ac2fbefb82e62b61f3f13ec2df612be86c300b9f426a153f8c3a2832f7c7c992d061e5a15e19de227ca0d460b6a"' : 'data-bs-target="#xs-injectables-links-module-AppModule-9d9296c6cd22ac679179a492b3d1b4b84d1e2ac2fbefb82e62b61f3f13ec2df612be86c300b9f426a153f8c3a2832f7c7c992d061e5a15e19de227ca0d460b6a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-9d9296c6cd22ac679179a492b3d1b4b84d1e2ac2fbefb82e62b61f3f13ec2df612be86c300b9f426a153f8c3a2832f7c7c992d061e5a15e19de227ca0d460b6a"' :
                                        'id="xs-injectables-links-module-AppModule-9d9296c6cd22ac679179a492b3d1b4b84d1e2ac2fbefb82e62b61f3f13ec2df612be86c300b9f426a153f8c3a2832f7c7c992d061e5a15e19de227ca0d460b6a"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-ce603ef69876b24d7fc7d36661fcc48b7f1e3095dc3e76d835de03dedb80495efb556e6fc9bc4a2becbdc6ead7df66f84f56d9caf023f5cc07d54b13cc86c2ae"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-ce603ef69876b24d7fc7d36661fcc48b7f1e3095dc3e76d835de03dedb80495efb556e6fc9bc4a2becbdc6ead7df66f84f56d9caf023f5cc07d54b13cc86c2ae"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-ce603ef69876b24d7fc7d36661fcc48b7f1e3095dc3e76d835de03dedb80495efb556e6fc9bc4a2becbdc6ead7df66f84f56d9caf023f5cc07d54b13cc86c2ae"' :
                                            'id="xs-controllers-links-module-AuthModule-ce603ef69876b24d7fc7d36661fcc48b7f1e3095dc3e76d835de03dedb80495efb556e6fc9bc4a2becbdc6ead7df66f84f56d9caf023f5cc07d54b13cc86c2ae"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-ce603ef69876b24d7fc7d36661fcc48b7f1e3095dc3e76d835de03dedb80495efb556e6fc9bc4a2becbdc6ead7df66f84f56d9caf023f5cc07d54b13cc86c2ae"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-ce603ef69876b24d7fc7d36661fcc48b7f1e3095dc3e76d835de03dedb80495efb556e6fc9bc4a2becbdc6ead7df66f84f56d9caf023f5cc07d54b13cc86c2ae"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-ce603ef69876b24d7fc7d36661fcc48b7f1e3095dc3e76d835de03dedb80495efb556e6fc9bc4a2becbdc6ead7df66f84f56d9caf023f5cc07d54b13cc86c2ae"' :
                                        'id="xs-injectables-links-module-AuthModule-ce603ef69876b24d7fc7d36661fcc48b7f1e3095dc3e76d835de03dedb80495efb556e6fc9bc4a2becbdc6ead7df66f84f56d9caf023f5cc07d54b13cc86c2ae"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetaOptionsModule.html" data-type="entity-link" >MetaOptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MetaOptionsModule-742a373e643da14172053385485196f762f0a9e6705122451faf932ec1fe04db5a5365a784c9325b3a9cc0e5490375f51cbe461a96333946cf6f310eef1486c5"' : 'data-bs-target="#xs-controllers-links-module-MetaOptionsModule-742a373e643da14172053385485196f762f0a9e6705122451faf932ec1fe04db5a5365a784c9325b3a9cc0e5490375f51cbe461a96333946cf6f310eef1486c5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MetaOptionsModule-742a373e643da14172053385485196f762f0a9e6705122451faf932ec1fe04db5a5365a784c9325b3a9cc0e5490375f51cbe461a96333946cf6f310eef1486c5"' :
                                            'id="xs-controllers-links-module-MetaOptionsModule-742a373e643da14172053385485196f762f0a9e6705122451faf932ec1fe04db5a5365a784c9325b3a9cc0e5490375f51cbe461a96333946cf6f310eef1486c5"' }>
                                            <li class="link">
                                                <a href="controllers/MetaOptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MetaOptionsModule-742a373e643da14172053385485196f762f0a9e6705122451faf932ec1fe04db5a5365a784c9325b3a9cc0e5490375f51cbe461a96333946cf6f310eef1486c5"' : 'data-bs-target="#xs-injectables-links-module-MetaOptionsModule-742a373e643da14172053385485196f762f0a9e6705122451faf932ec1fe04db5a5365a784c9325b3a9cc0e5490375f51cbe461a96333946cf6f310eef1486c5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetaOptionsModule-742a373e643da14172053385485196f762f0a9e6705122451faf932ec1fe04db5a5365a784c9325b3a9cc0e5490375f51cbe461a96333946cf6f310eef1486c5"' :
                                        'id="xs-injectables-links-module-MetaOptionsModule-742a373e643da14172053385485196f762f0a9e6705122451faf932ec1fe04db5a5365a784c9325b3a9cc0e5490375f51cbe461a96333946cf6f310eef1486c5"' }>
                                        <li class="link">
                                            <a href="injectables/MetaOptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-2f024937a2cebdf44da5aefbe426bf6e13de591064e592c52e75384698d0b6b73e28c57a84fc31b46c840cac0a248982a80cea1ac9b01e2cc869e313016e409f"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-2f024937a2cebdf44da5aefbe426bf6e13de591064e592c52e75384698d0b6b73e28c57a84fc31b46c840cac0a248982a80cea1ac9b01e2cc869e313016e409f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-2f024937a2cebdf44da5aefbe426bf6e13de591064e592c52e75384698d0b6b73e28c57a84fc31b46c840cac0a248982a80cea1ac9b01e2cc869e313016e409f"' :
                                            'id="xs-controllers-links-module-PostsModule-2f024937a2cebdf44da5aefbe426bf6e13de591064e592c52e75384698d0b6b73e28c57a84fc31b46c840cac0a248982a80cea1ac9b01e2cc869e313016e409f"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-2f024937a2cebdf44da5aefbe426bf6e13de591064e592c52e75384698d0b6b73e28c57a84fc31b46c840cac0a248982a80cea1ac9b01e2cc869e313016e409f"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-2f024937a2cebdf44da5aefbe426bf6e13de591064e592c52e75384698d0b6b73e28c57a84fc31b46c840cac0a248982a80cea1ac9b01e2cc869e313016e409f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-2f024937a2cebdf44da5aefbe426bf6e13de591064e592c52e75384698d0b6b73e28c57a84fc31b46c840cac0a248982a80cea1ac9b01e2cc869e313016e409f"' :
                                        'id="xs-injectables-links-module-PostsModule-2f024937a2cebdf44da5aefbe426bf6e13de591064e592c52e75384698d0b6b73e28c57a84fc31b46c840cac0a248982a80cea1ac9b01e2cc869e313016e409f"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-3dd22aefb6e25e6ee9489ee712fecafe9230a06234e5a8dbf9847755f1fdf66dafa9172afebc13a7d1f2355676f1938609c71cab20cd131c8c2587adc4dd6964"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-3dd22aefb6e25e6ee9489ee712fecafe9230a06234e5a8dbf9847755f1fdf66dafa9172afebc13a7d1f2355676f1938609c71cab20cd131c8c2587adc4dd6964"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-3dd22aefb6e25e6ee9489ee712fecafe9230a06234e5a8dbf9847755f1fdf66dafa9172afebc13a7d1f2355676f1938609c71cab20cd131c8c2587adc4dd6964"' :
                                            'id="xs-controllers-links-module-TagsModule-3dd22aefb6e25e6ee9489ee712fecafe9230a06234e5a8dbf9847755f1fdf66dafa9172afebc13a7d1f2355676f1938609c71cab20cd131c8c2587adc4dd6964"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-4dd6595ee0260c22274cc471aa7a8b9d72b3de1f689251ee72a31eb0a17f4ab6b650a886fd244a2d8cb5fc472a11cf9f9660313539c67547153aa42b22044a5d"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-4dd6595ee0260c22274cc471aa7a8b9d72b3de1f689251ee72a31eb0a17f4ab6b650a886fd244a2d8cb5fc472a11cf9f9660313539c67547153aa42b22044a5d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-4dd6595ee0260c22274cc471aa7a8b9d72b3de1f689251ee72a31eb0a17f4ab6b650a886fd244a2d8cb5fc472a11cf9f9660313539c67547153aa42b22044a5d"' :
                                            'id="xs-controllers-links-module-UsersModule-4dd6595ee0260c22274cc471aa7a8b9d72b3de1f689251ee72a31eb0a17f4ab6b650a886fd244a2d8cb5fc472a11cf9f9660313539c67547153aa42b22044a5d"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-4dd6595ee0260c22274cc471aa7a8b9d72b3de1f689251ee72a31eb0a17f4ab6b650a886fd244a2d8cb5fc472a11cf9f9660313539c67547153aa42b22044a5d"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-4dd6595ee0260c22274cc471aa7a8b9d72b3de1f689251ee72a31eb0a17f4ab6b650a886fd244a2d8cb5fc472a11cf9f9660313539c67547153aa42b22044a5d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-4dd6595ee0260c22274cc471aa7a8b9d72b3de1f689251ee72a31eb0a17f4ab6b650a886fd244a2d8cb5fc472a11cf9f9660313539c67547153aa42b22044a5d"' :
                                        'id="xs-injectables-links-module-UsersModule-4dd6595ee0260c22274cc471aa7a8b9d72b3de1f689251ee72a31eb0a17f4ab6b650a886fd244a2d8cb5fc472a11cf9f9660313539c67547153aa42b22044a5d"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/MetaOption.html" data-type="entity-link" >MetaOption</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Posts.html" data-type="entity-link" >Posts</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionDto.html" data-type="entity-link" >CreatePostMetaOptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamsDto.html" data-type="entity-link" >GetUserParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});