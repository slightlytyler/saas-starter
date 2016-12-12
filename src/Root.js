import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter, Link, Match } from 'react-router';
import { CodeSplitProvider, CodeSplit } from 'code-split-component';
import { injectReducer } from './reducer';

export default ({ store }) => (
	<StoreProvider store={store}>
		<CodeSplitProvider>
			<BrowserRouter>
				<div>
			    <ul>
			      <li><Link to="/">Index</Link></li>
			      <li><Link to="/auth/login">Login</Link></li>
			      <li><Link to="/auth/sign-up">Sign Up</Link></li>
			      <li><Link to="/home">Home</Link></li>
			    </ul>
			    <hr/>
			    <Match 
			    	pattern="/auth" 
			    	render={({ pathname }) => (
				    	<CodeSplit 
				    		chunkName="Auth" 
				    		modules={{ 
				    			AuthRoot: require('./modules/auth/components/Root'), 
				    			authReducer: require('./modules/auth/reducer'), 
				    		}}
				    	>
				    		{({ AuthRoot, authReducer }) => {
				    			if (authReducer) injectReducer(store, { key: 'auth', reducer: authReducer });
				    			return AuthRoot && <AuthRoot pathname={pathname} />;
				    		}}
				    	</CodeSplit>
				    )} 
			    />
			    <Match 
			    	pattern="/home" 
			    	render={() => (
				    	<CodeSplit 
				    		chunkName="Home" 
				    		modules={{ Home: require('./modules/home/components/Root') }}
				    	>
				    		{({ Home }) => Home && <Home />}
				    	</CodeSplit>
				    )}
			    />
			  </div>
			</BrowserRouter>
		</CodeSplitProvider>
	</StoreProvider>
);
