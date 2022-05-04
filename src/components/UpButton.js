import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Icon, Button, Label } from "semantic-ui-react";

import MyPopup from "../utils/MyPopup";

export const UpButton = ({ user, post: { id, likeCount, likes } }) => {
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		if (user && likes.find((like) => like.username === user.username)) {
			setLiked(true);
		} else setLiked(false);
	}, [user, likes]);

	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id },
	});

	const upButton = user ? (
		liked ? (
			<Button color='red'>
				<Icon name='thumbs up' />
			</Button>
		) : (
			<Button color='green' basic>
				<Icon name='thumbs up' />
			</Button>
		)
	) : (
		<Button as={Link} to='/login' color='green' basic>
			<Icon name='thumbs up' />
		</Button>
	);

	return (
		<Button as='div' labelPosition='right' onClick={likePost}>
			<MyPopup content={liked ? "Unlike post" : "Like post"}>
				{upButton}
			</MyPopup>
			<Label basic color='green' pointing='left'>
				{likeCount}
			</Label>
		</Button>
	);
};

const LIKE_POST_MUTATION = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				username
			}
			likeCount
		}
	}
`;

export default UpButton; 
