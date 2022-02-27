import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const Header = () => {
	return (
		<Container maxWidth="lg">
			<header>
				<Typography
					variant="h3"
					marginTop={4}
					marginBottom={6}
					color="primary"
					fontWeight={100}
				>
					Admin Dashboard
				</Typography>
			</header>
		</Container>
	);
};
