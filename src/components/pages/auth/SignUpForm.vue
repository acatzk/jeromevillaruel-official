<template>
    <b-form>
        <b-form-group
            label="Name"
        >
            <b-form-input
                required
                id="txtpost" 
            ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Username"
        >
            <b-form-input
                required
                id="txtpost" 
            ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Email"
        >
            <b-form-input
                type="email"
                id="txtpost" 
                required
            ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Password"
        >
            <b-form-input
                required
                id="txtpost" 
                type="password"
            ></b-form-input>
        </b-form-group>

        <b-row>
            <b-col>
                <b-button type="submit" block variant="primary">Sign Up</b-button>
            </b-col>
            <b-col>
                <b-button type="reset" block variant="outline-secondary">Cancel</b-button>
            </b-col>
        </b-row>
    </b-form>
</template>