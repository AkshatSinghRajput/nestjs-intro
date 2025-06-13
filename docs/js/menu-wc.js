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
                                            'data-bs-target="#controllers-links-module-AppModule-17b2a8029d5ecaa7d8d171037f7f30374300ae21d5a5522708992394789dc435f276abbf046a1b1a869da1ede44c14e11d8854cee6eb5e4d022c3d8a4be6ba00"' : 'data-bs-target="#xs-controllers-links-module-AppModule-17b2a8029d5ecaa7d8d171037f7f30374300ae21d5a5522708992394789dc435f276abbf046a1b1a869da1ede44c14e11d8854cee6eb5e4d022c3d8a4be6ba00"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-17b2a8029d5ecaa7d8d171037f7f30374300ae21d5a5522708992394789dc435f276abbf046a1b1a869da1ede44c14e11d8854cee6eb5e4d022c3d8a4be6ba00"' :
                                            'id="xs-controllers-links-module-AppModule-17b2a8029d5ecaa7d8d171037f7f30374300ae21d5a5522708992394789dc435f276abbf046a1b1a869da1ede44c14e11d8854cee6eb5e4d022c3d8a4be6ba00"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-17b2a8029d5ecaa7d8d171037f7f30374300ae21d5a5522708992394789dc435f276abbf046a1b1a869da1ede44c14e11d8854cee6eb5e4d022c3d8a4be6ba00"' : 'data-bs-target="#xs-injectables-links-module-AppModule-17b2a8029d5ecaa7d8d171037f7f30374300ae21d5a5522708992394789dc435f276abbf046a1b1a869da1ede44c14e11d8854cee6eb5e4d022c3d8a4be6ba00"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-17b2a8029d5ecaa7d8d171037f7f30374300ae21d5a5522708992394789dc435f276abbf046a1b1a869da1ede44c14e11d8854cee6eb5e4d022c3d8a4be6ba00"' :
                                        'id="xs-injectables-links-module-AppModule-17b2a8029d5ecaa7d8d171037f7f30374300ae21d5a5522708992394789dc435f276abbf046a1b1a869da1ede44c14e11d8854cee6eb5e4d022c3d8a4be6ba00"' }>
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
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-ff7d767d40daadcc7812d368b5601b735eb5d2105f7a880b3dac0c2253783176a7c77dfb574aeadce1fab74df879f754eebef78f44363815647deb63d0623217"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-ff7d767d40daadcc7812d368b5601b735eb5d2105f7a880b3dac0c2253783176a7c77dfb574aeadce1fab74df879f754eebef78f44363815647deb63d0623217"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-ff7d767d40daadcc7812d368b5601b735eb5d2105f7a880b3dac0c2253783176a7c77dfb574aeadce1fab74df879f754eebef78f44363815647deb63d0623217"' :
                                            'id="xs-controllers-links-module-PostsModule-ff7d767d40daadcc7812d368b5601b735eb5d2105f7a880b3dac0c2253783176a7c77dfb574aeadce1fab74df879f754eebef78f44363815647deb63d0623217"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-ff7d767d40daadcc7812d368b5601b735eb5d2105f7a880b3dac0c2253783176a7c77dfb574aeadce1fab74df879f754eebef78f44363815647deb63d0623217"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-ff7d767d40daadcc7812d368b5601b735eb5d2105f7a880b3dac0c2253783176a7c77dfb574aeadce1fab74df879f754eebef78f44363815647deb63d0623217"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-ff7d767d40daadcc7812d368b5601b735eb5d2105f7a880b3dac0c2253783176a7c77dfb574aeadce1fab74df879f754eebef78f44363815647deb63d0623217"' :
                                        'id="xs-injectables-links-module-PostsModule-ff7d767d40daadcc7812d368b5601b735eb5d2105f7a880b3dac0c2253783176a7c77dfb574aeadce1fab74df879f754eebef78f44363815647deb63d0623217"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-60bb6c8dda0006a03a8e71638cadaf08f9b9f006a98c1893614a5e0d6d32a82805fc5ae5cfb421fba90a9ad60ca700bf2d743e6c411dce687c40ff6b673a5066"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-60bb6c8dda0006a03a8e71638cadaf08f9b9f006a98c1893614a5e0d6d32a82805fc5ae5cfb421fba90a9ad60ca700bf2d743e6c411dce687c40ff6b673a5066"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-60bb6c8dda0006a03a8e71638cadaf08f9b9f006a98c1893614a5e0d6d32a82805fc5ae5cfb421fba90a9ad60ca700bf2d743e6c411dce687c40ff6b673a5066"' :
                                            'id="xs-controllers-links-module-UsersModule-60bb6c8dda0006a03a8e71638cadaf08f9b9f006a98c1893614a5e0d6d32a82805fc5ae5cfb421fba90a9ad60ca700bf2d743e6c411dce687c40ff6b673a5066"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-60bb6c8dda0006a03a8e71638cadaf08f9b9f006a98c1893614a5e0d6d32a82805fc5ae5cfb421fba90a9ad60ca700bf2d743e6c411dce687c40ff6b673a5066"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-60bb6c8dda0006a03a8e71638cadaf08f9b9f006a98c1893614a5e0d6d32a82805fc5ae5cfb421fba90a9ad60ca700bf2d743e6c411dce687c40ff6b673a5066"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-60bb6c8dda0006a03a8e71638cadaf08f9b9f006a98c1893614a5e0d6d32a82805fc5ae5cfb421fba90a9ad60ca700bf2d743e6c411dce687c40ff6b673a5066"' :
                                        'id="xs-injectables-links-module-UsersModule-60bb6c8dda0006a03a8e71638cadaf08f9b9f006a98c1893614a5e0d6d32a82805fc5ae5cfb421fba90a9ad60ca700bf2d743e6c411dce687c40ff6b673a5066"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
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
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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