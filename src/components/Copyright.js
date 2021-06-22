import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright(props) {

	const host = props.title;
    //os.hostname();
	//console.log(host);

	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href={host}>
				{host}
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default Copyright;

