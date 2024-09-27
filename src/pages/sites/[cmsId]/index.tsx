import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCms } from '~/components/core/cms';
import Dashboard from '~/components/core/dashboard';

export default function Page() {
	const router = useRouter();
	const { cms } = useCms();
	const session = useSession({
		required: true,
	});

	// return <h1>yo</h1>;

	return (
		<Dashboard cms={cms} session={session.data!} requiresCms>
			yoss
		</Dashboard>
	);
}
