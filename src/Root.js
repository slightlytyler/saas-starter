import React from 'react';
import { BrowserRouter, Link, Match } from 'react-router';
import { CodeSplitProvider, CodeSplit } from 'code-split-component';

export default () => (
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
			    		modules={{ Auth: require('./modules/auth/components/Root') }}
			    	>
			    		{({ Auth }) => Auth && <Auth pathname={pathname} />}
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
);
