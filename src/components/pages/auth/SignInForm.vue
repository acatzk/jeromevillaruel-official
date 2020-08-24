<template>
    <b-form>
        <b-form-group
            label="Email"
        >
            <b-form-input
                type="email"
                required
                id="txtpost" 
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
                <b-button type="submit" block variant="primary">Login</b-button>
            </b-col>
            <b-col>
                <b-button type="reset" block variant="outline-secondary">Cancel</b-button>
            </b-col>
        </b-row>
    </b-form>
</template>