import { observable, action } from 'mobx';
import { setClassProps } from '../utils/helpers';

/**
 * MobX store class.
 * For app wide App configurations.
 * @class
 */
export default class AppStore {
	@observable
	example = {
		name: 'example',
	};

	/**
	 * Function used to assign values to the members of
	 *  this class from an external function or a react component.
	 * @param {Array} arr - An array key:value pairs of class members and their values
	 * @param {Object} self - Refers to the class itself or a member.
	 */
	@action
	setClassProps = (arr, self = this) => setClassProps(arr, self);
}
